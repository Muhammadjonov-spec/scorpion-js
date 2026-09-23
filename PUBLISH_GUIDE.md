# 📚 Express Shablonini NPM va GitHub'ga Chiqarish Qo'llanmasi

Ushbu qo'llanmada o'zingiz yaratgan ushbu CLI generator va shablonni qanday qilib **NPM** hamda **GitHub**ga joylashtirish, shuningdek kelajakda istalgan kompyuterda `npx` yoki `git clone` orqali bir zumda ishlatish o'rgatiladi.

---

## 🧠 Bu tizim qanday ishlaydi (Arxitektura va Mexanizm)?

1. **`bin` bo'limi**: `package.json` faylida `"bin": { "scorpion-js": "bin/cli.js" }` ko'rsatilgan. Bu Node.js ga ushbu paket konsol buyrug'i ekanligini bildiradi.
2. **`#!/usr/bin/env node` (Shebang)**: `bin/cli.js` faylining eng birinchi qatori operatsion tizimga ushbu faylni Node.js orqali ishga tushirish kerakligini aytadi.
3. **`npx` buyrug'i**: `npx <paket-nomi>` yozganingizda, NPM ushbu paketni vaqtinchalik yuklab oladi, uning `bin` faylini ishga tushiradi va loyihani generatsiya qilib beradi (kompyuterga global o'rnatish shart bo'lmaydi).

---

## 1-QADAM: Lokal Sinash (Kompyuteringizda Tekshirish)

NPM'ga chiqarishdan oldin hamma narsa to'g'ri ishlayotganiga ishonch hosil qiling:

1. Terminalda loyiha papkasiga kiring:
   ```bash
   cd d:\AntigravityAI\exampleArcht
   ```

2. Paketni kompyuteringizda global buyruq sifatida ulab oling:
   ```bash
   npm link
   ```

3. Endi boshqa istalgan papkaga o'ting (masalan, `Desktop` yoki boshqa papka) va CLI'ni sinab ko'ring:
   ```bash
   scorpion-js mening-sinov-appim
   ```
   CLI interaktiv ravishda savollarni beradi (ESM/CJS, MongoDB/Prisma/None, npm install, git init) va to'liq loyihani yaratadi!

---

## 2-QADAM: NPM'ga Chiqarish (Publish to NPM)

`npx <nom>` orqali istalgan joyda ishlashi uchun uni NPM reyestriga yuklaymiz.

### 2.1. Paket Nomini Tekshirish
NPM'da `scorpion-js` nomi bo'shligi tekshirildi (404 Not Found), demak uni bemalol olishingiz mumkin!

### 2.2. Terminal orqali NPM'ga Kirish
Terminalda quyidagi buyruqni bering:
```bash
npm login
```
*(Siz allaqachon login qildingiz!)*

### 2.3. Paketni Nashr Qilish (Publish)
Paket papkasida turib, buyruqni bajaring:

```bash
npm publish --access public
```

Tabriklaymiz! Bir necha soniyadan so'ng paketingiz butun dunyo uchun ochiq bo'ladi va istalgan inson:
```bash
npx scorpion-js my-api
```
buyrug'i orqali yangi loyiha ocha oladi.

---

## 3-QADAM: GitHub'ga Joylash va Shablon (Template) Qilish

Agar loyihani GitHub'da ham shablon sifatida saqlab qo'ymoqchi bo'lsangiz:

### 3.1. Git Omborini Tayyorlash va GitHub'ga Yuklash
1. [github.com](https://github.com) saytida yangi repozitoriy oching (masalan, `create-quick-express` yoki `express-starter-template`).
2. Terminalda quyidagi buyruqlarni bajaring:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit - express cli and layered templates"
   git branch -M main
   git remote add origin https://github.com/SIZNING_USERNAME/SIZNING_REPO_NOMI.git
   git push -u origin main
   ```

### 3.2. GitHub'da "Template repository"ni Yoqish (Muhim!)
1. GitHub'da ushbu repozitoriyingizga kiring.
2. Yuqoridagi **Settings** bo'limiga o'ting.
3. Eng birinchi sahifada **"Template repository"** degan checkbox mavjud.
4. Uni yoqing (**[v] Template repository**).

Endi repozitoriyingizning asosiy sahifasida yashil **"Use this template"** tugmasi paydo bo'ladi! Siz va boshqalar ushbu tugmani bosish orqali GitHub'da to'g'ridan-to'g'ri yangi backend repozitoriy yaratib ketaverasiz.

---

## 4-QADAM: Kelajakda Yangilanishlar Kiritish (Update)

Agar shabloningizga yangi utilitlar, yangi middleware yoki boshqa kutubxonalarni qo'shsangiz:

1. Kodni o'zgartiring va yaxshilang.
2. `package.json` faylida versiyani oshiring:
   ```bash
   npm version minor   # Masalan: 1.0.0 -> 1.1.0
   ```
3. O'zgarishlarni NPM'ga qayta chiqaring:
   ```bash
   npm publish
   ```
4. GitHub'ga push qiling:
   ```bash
   git push origin main --tags
   ```

Natijada barcha yangilanishlar darhol `npx` orqali yangi loyiha yaratuvchilarga yetib boradi!
