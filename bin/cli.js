#!/usr/bin/env node

import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { input, select, confirm } from '@inquirer/prompts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('\n' + chalk.bold.cyan('╔════════════════════════════════════════════════════════╗'));
  console.log(chalk.bold.cyan('║') + chalk.bold.white('          🦂 SCORPION-JS EXPRESS GENERATOR              ') + chalk.bold.cyan('║'));
  console.log(chalk.bold.cyan('║') + chalk.gray('   Professional Express.js Layered/MVC Architecture     ') + chalk.bold.cyan('║'));
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════╝\n'));

  // 1. Loyiha nomi
  const defaultProjectName = process.argv[2] || 'my-express-app';
  const projectName = await input({
    message: 'Loyiha nomini kiriting (Project name):',
    default: defaultProjectName,
    validate: (value) => {
      if (/^[a-zA-Z0-9-_]+$/.test(value)) return true;
      return 'Loyiha nomi faqat harflar, sonlar, chiziqcha (-) va pastki chiziqcha (_) dan iborat bo‘lishi kerak.';
    },
  });

  const targetDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(targetDir)) {
    const files = fs.readdirSync(targetDir);
    if (files.length > 0) {
      const overwrite = await confirm({
        message: chalk.yellow(`'${projectName}' nomli papka bo‘sh emas. Davom etish va uni tozalashni xohlaysizmi?`),
        default: false,
      });

      if (!overwrite) {
        console.log(chalk.red('❌ Jarayon bekor qilindi.'));
        process.exit(1);
      }
      await fs.emptyDir(targetDir);
    }
  } else {
    await fs.ensureDir(targetDir);
  }

  // 2. Modul tizimini tanlash (ES Modules yoki CommonJS)
  const moduleSystem = await select({
    message: 'Modul tizimini tanlang (Module system):',
    choices: [
      {
        name: 'ES Modules (import / export - Zamonaviy va tavsiya etiladi)',
        value: 'esm',
        description: 'ES6+ import/export sintaksisi va package.json da "type": "module"',
      },
      {
        name: 'CommonJS (require / module.exports - Klassik Node.js)',
        value: 'cjs',
        description: 'require() va module.exports sintaksisi',
      },
    ],
  });

  // 3. Ma'lumotlar bazasini tanlash
  const database = await select({
    message: 'Ma‘lumotlar bazasi (Database / ORM) ni tanlang:',
    choices: [
      {
        name: 'MongoDB (Mongoose ODM)',
        value: 'mongo',
        description: 'Mongoose orqali MongoDB ulanishi, User sxemasi va xeshlash bilan',
      },
      {
        name: 'PostgreSQL / MySQL (Prisma ORM)',
        value: 'prisma',
        description: 'Prisma Client, schema.prisma va migratsiyalar bilan',
      },
      {
        name: 'Ma‘lumotlar bazasisiz (No database)',
        value: 'none',
        description: 'DBsiz toza Express.js API skleti (demo in-memory xizmatlar bilan)',
      },
    ],
  });

  // 4. npm install va git init so'rovlari
  const runInstall = await confirm({
    message: 'Kutubxonalarni hoziroq o‘rnatishni xohlaysizmi (Run "npm install")?',
    default: true,
  });

  const runGit = await confirm({
    message: 'Git omborini ishga tushirishni xohlaysizmi (Run "git init")?',
    default: true,
  });

  const spinner = ora('Fayllar ko‘chirilmoqda va arxitektura shakllantirilmoqda...').start();

  try {
    // 5. Shablonni nusxalash
    const templateDir = path.resolve(__dirname, '..', 'templates', moduleSystem);
    await fs.copy(templateDir, targetDir);

    // 6. DB bo'yicha fayllarni moslashtirish
    const ext = 'js';
    const configDir = path.join(targetDir, 'src', 'config');
    const servicesDir = path.join(targetDir, 'src', 'services');
    const modelsDir = path.join(targetDir, 'src', 'models');
    const prismaDir = path.join(targetDir, 'prisma');

    // db.js ni o'rnatish
    await fs.move(path.join(configDir, `db.${database}.${ext}`), path.join(configDir, `db.${ext}`), { overwrite: true });

    // auth.service va user.service ni o'rnatish
    await fs.move(path.join(servicesDir, `auth.service.${database}.${ext}`), path.join(servicesDir, `auth.service.${ext}`), { overwrite: true });
    await fs.move(path.join(servicesDir, `user.service.${database}.${ext}`), path.join(servicesDir, `user.service.${ext}`), { overwrite: true });

    // Models ni o'rnatish
    if (database === 'mongo') {
      await fs.move(path.join(modelsDir, `user.mongo.model.${ext}`), path.join(modelsDir, `user.model.${ext}`), { overwrite: true });
      if (fs.existsSync(prismaDir)) await fs.remove(prismaDir);
    } else if (database === 'prisma') {
      if (fs.existsSync(modelsDir)) await fs.remove(modelsDir);
    } else {
      if (fs.existsSync(modelsDir)) await fs.remove(modelsDir);
      if (fs.existsSync(prismaDir)) await fs.remove(prismaDir);
    }

    // Keraksiz qolgan shablon fayllarini tozalash (.mongo.js, .prisma.js, .none.js)
    const cleanArtifacts = (dir) => {
      if (!fs.existsSync(dir)) return;
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.includes('.mongo.') || file.includes('.prisma.') || file.includes('.none.')) {
          fs.removeSync(path.join(dir, file));
        }
      }
    };
    cleanArtifacts(configDir);
    cleanArtifacts(servicesDir);
    cleanArtifacts(modelsDir);

    // .env.example dan .env yaratish
    const envExamplePath = path.join(targetDir, '.env.example');
    const envPath = path.join(targetDir, '.env');
    if (fs.existsSync(envExamplePath)) {
      await fs.copy(envExamplePath, envPath);
    }

    // package.json ni yangilash
    const pkgPath = path.join(targetDir, 'package.json');
    const pkg = await fs.readJson(pkgPath);
    pkg.name = projectName;

    if (database === 'mongo') {
      pkg.dependencies = pkg.dependencies || {};
      pkg.dependencies['mongoose'] = '^8.9.5';
    } else if (database === 'prisma') {
      pkg.dependencies = pkg.dependencies || {};
      pkg.devDependencies = pkg.devDependencies || {};
      pkg.dependencies['@prisma/client'] = '^6.2.1';
      pkg.devDependencies['prisma'] = '^6.2.1';
      pkg.scripts = pkg.scripts || {};
      pkg.scripts['prisma:generate'] = 'prisma generate';
      pkg.scripts['prisma:migrate'] = 'prisma migrate dev';
    }

    await fs.writeJson(pkgPath, pkg, { spaces: 2 });

    spinner.succeed(chalk.green('Loyiha fayllari va konfiguratsiyasi muvaffaqiyatli tayyorlandi!'));

    // 7. Git Init
    if (runGit) {
      const gitSpinner = ora('Git ombori ishga tushirilmoqda (git init)...').start();
      try {
        execSync('git init', { cwd: targetDir, stdio: 'ignore' });
        gitSpinner.succeed(chalk.green('Git ombori muvaffaqiyatli ishga tushirildi.'));
      } catch (err) {
        gitSpinner.warn(chalk.yellow('Git ishga tushirishda ogohlantirish (ehtimol Git o‘rnatilmagan).'));
      }
    }

    // 8. npm install
    if (runInstall) {
      const npmSpinner = ora('Kutubxonalar o‘rnatilmoqda (npm install). Bu bir necha daqiqa vaqt olishi mumkin...').start();
      try {
        execSync('npm install', { cwd: targetDir, stdio: 'ignore' });
        npmSpinner.succeed(chalk.green('Barcha kutubxonalar muvaffaqiyatli o‘rnatildi!'));

        // Prisma tanlangan bo'lsa, prisma generate
        if (database === 'prisma') {
          const prismaSpinner = ora('Prisma Client generatsiya qilinmoqda (npx prisma generate)...').start();
          try {
            execSync('npx prisma generate', { cwd: targetDir, stdio: 'ignore' });
            prismaSpinner.succeed(chalk.green('Prisma Client tayyorlandi!'));
          } catch {
            prismaSpinner.warn(chalk.yellow('Prisma generatsiya qilinmadi. Qo‘lda "npx prisma generate" bajaring.'));
          }
        }
      } catch (err) {
        npmSpinner.fail(chalk.red('npm install bajarishda xatolik yuz berdi. Iltimos, papkaga kirib "npm install" ni qo‘lda bajaring.'));
      }
    }

    // Yakuniy tabrik va ko'rsatmalar
    console.log('\n' + chalk.bold.green('🎉 Tabriklaymiz! Loyihangiz to‘liq tayyor.'));
    console.log('\n' + chalk.bold.white('Boshlash uchun quyidagi buyruqlarni bajaring:'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    if (!runInstall) {
      console.log(chalk.cyan('  npm install'));
    }
    console.log(chalk.cyan('  npm run dev'));
    console.log('\n' + chalk.gray('Server: http://localhost:5000'));
    console.log(chalk.gray('Sog‘lik tekshiruvi (Health): http://localhost:5000/api/v1/health\n'));
  } catch (error) {
    spinner.fail(chalk.red('Loyiha yaratishda xatolik yuz berdi:'));
    console.error(error);
    process.exit(1);
  }
}

run();
