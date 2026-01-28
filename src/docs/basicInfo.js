require('dotenv').config();

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'E-DrawGuide API Dokumentatsiyasi',
        version: '1.0.0',
        description: `
## Elektron o'quv qo'llanma (LMS) Backend tizimi
Ushbu hujjat Flutter va Web dasturchilar uchun mo'ljallangan.

**Asosiy funksiyalar:**
* 🔐 **Auth:** JWT orqali himoyalangan autentifikatsiya.
* 📚 **Library:** Elektron kutubxona boshqaruvi.
* 🎥 **Video:** Video darslar tizimi.
* ❓ **Quiz:** (Tez orada) Test ishlash tizimi.

**Xavfsizlik:**
Aksariyat APIlar uchun \`Authorization: Bearer <token>\` headeri talab qilinadi.
        `,
        contact: {
            name: 'Backend Developer',
            url: 'https://github.com/',
        },
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 4001}/api/v1`,
            description: '💻 Local Server',
        },
        {
            url: 'https://api.e-drawguide.uz/api/v1',
            description: '🚀 Production Server',
        }
    ]
};