# Express.js REST API Starter

Ushbu loyiha professional qatlamli (Layered/MVC) arxitekturada qurilgan Express.js REST API shablonidir.

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

## 🔐 API Endpointlar Namunasi

| Metod | Manzil | Ta'rif | Himoya |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Server holatini tekshirish | Ochiq |
| `POST` | `/api/auth/register` | Yangi foydalanuvchini ro'yxatdan o'tkazish | Ochiq |
| `POST` | `/api/auth/login` | Tizimga kirish (JWT token olish) | Ochiq |
| `GET` | `/api/auth/me` | Joriy foydalanuvchi ma'lumotlari | Bearer Token |
| `GET` | `/api/users` | Barcha foydalanuvchilar ro'yxati | Admin |
| `GET` | `/api/users/:id` | Bitta foydalanuvchi | Bearer Token |
| `PUT` | `/api/users/:id` | Foydalanuvchini tahrirlash | Bearer Token |
| `DELETE` | `/api/users/:id` | Foydalanuvchini o'chirish | Admin |
