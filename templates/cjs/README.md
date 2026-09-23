# Express.js REST API Starter (CommonJS)

Ushbu loyiha professional qatlamli (Layered/MVC) arxitekturada qurilgan Express.js REST API shablonidir (CommonJS `require/module.exports` formatida).

## 📁 Loyiha Strukturasi

```
src/
├── config/          # Muhit o'zgaruvchilari va Ma'lumotlar bazasi ulanishi
├── controllers/     # HTTP so'rovlarni qabul qilish va javob qaytarish
├── services/        # Asosiy biznes mantiq (Business Logic)
├── models/          # Ma'lumotlar bazasi sxemalari (Mongoose / Prisma)
├── routes/          # API marshrutlari
├── middlewares/     # JWT Auth, Xatoliklar boshqaruvi, Validatsiya
├── utils/           # ApiError, ApiResponse, asyncHandler, jwt yordamchilari
├── app.js           # Express sozlamalari va global middleware'lar
└── server.js        # Serverni ishga tushirish fayli
```

## 🚀 Ishga tushirish

1. Muhit o'zgaruvchilarini sozlang:
   `.env.example` faylidan `.env` nusxasini oling va qiymatlarni to'ldiring.

2. Kutubxonalarni o'rnatish:
   ```bash
   npm install
   ```

3. Serverni ishlab chiqish (Development) rejimida ishga tushirish:
   ```bash
   npm run dev
   ```

4. Serverni ishlab chiqarish (Production) rejimida ishga tushirish:
   ```bash
   npm start
   ```
