# 🦂 scorpion-js

Express.js loyihalarini har safar noldan yozmaslik, papkalarni qayta-qayta tuzmaslik va standart kutubxonalarni qayta sozlamaslik uchun yaratilgan **Scaffolding CLI Generator** va **GitHub Shablon Tizimi**.

---

## 🌟 Imkoniyatlar

- ⚡ **Bir lahzada tayyor backend**: bitta buyruq bilan to'liq ishlaydigan Express REST API.
- 🔄 **Modul tizimini tanlash**: O'rnatish jarayonida **ES Modules** (`import/export`) yoki **CommonJS** (`require/exports`) tanlash imkoniyati.
- 🗄️ **Ma'lumotlar bazasi integratsiyasi**: **MongoDB (Mongoose)**, **PostgreSQL/MySQL (Prisma ORM)** yoki toza arxitektura tanlash.
- 🧱 **Professional Qatlamli Arxitektura (Layered/MVC)**:
  - `controllers/` - HTTP so'rov/javob boshqaruvi
  - `services/` - Biznes mantiq qatlami (Business Logic)
  - `models/` - Ma'lumotlar bazasi sxemalari (Mongoose / Prisma)
  - `routes/` - URL marshrutlari
  - `middlewares/` - Autentifikatsiya, validatsiya va xatolar ushlagichi
  - `utils/` - `ApiError`, `ApiResponse`, `asyncHandler`, `jwt`
  - `config/` - Muhit o'zgaruvchilari (`.env`) va ma'lumotlar bazasi ulanishi
- 🔒 **Xavfsizlik va Utilitlar**: `cors`, `helmet`, `morgan`, `express-rate-limit`, `joi` validatsiyasi.
- 🔑 **JWT Autentifikatsiya**: Parollarni avtomatik xeshlash (`bcryptjs`), JWT token yaratish va tekshirish, Role-based ruxsatlar (`protect`, `restrictTo('admin')`).
- 🛠️ **Avtomatlashtirish**: Avtomatik `npm install` va `git init`.

---

## 📦 Foydalanish (NPX orqali)

```bash
npx scorpion-js
```
yoki loyiha nomini oldindan berib:
```bash
npx scorpion-js mening-loyiham
```

CLI sizdan quyidagilarni so'raydi:
1. **Loyiha nomi** (Project name)
2. **Modul tizimi**: ES Modules yoki CommonJS
3. **Ma'lumotlar bazasi**: MongoDB (Mongoose), PostgreSQL/MySQL (Prisma) yoki Ma'lumotlar bazasisiz
4. **Kutubxonalarni o'rnatish**: `npm install` hoziroq bajarilsinmi?
5. **Git omborini ishga tushirish**: `git init` bajarilsinmi?

So'rovlardan so'ng barcha kerakli fayllar avtomatik yaratiladi va sozlanadi!

---

## 🐙 GitHub'dan Foydalanish (Git Clone / Template)

Ushbu repozitoriyni GitHub'da **"Template repository"** sifatida belgilab qo'yganingizdan so'ng:

1. **GitHub orqali**: Repozitoriy sahifasiga kirib, **"Use this template"** tugmasini bosing va yangi repo yarating.
2. **Git clone orqali**:
   ```bash
   git clone <repo-manzili> yangi-loyiha
   cd yangi-loyiha
   npm install
   npm run dev
   ```

---

## 🛠️ Lokal Sinash (Local Development & Testing)

O'z kompyuteringizda ushbu CLI'ni sinab ko'rish:

```bash
# Ushbu repozitoriy ichida:
npm install

# Global havola (link) yaratish:
npm link

# Endi istalgan boshqa papkada CLI'ni sinab ko'ring:
scorpion-js yangi-test-loyiha
```

---

## 📖 To'liq Qo'llanma

NPM va GitHub'ga qanday chiqarish, hisob ochish va versiyalash bo'yicha bosqichma-bosqich qo'llanma uchun **[PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md)** fayliga qarang.
