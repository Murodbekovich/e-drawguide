e-drawguide/
├── .github/
│   └── workflows/
│       └── node.js.yml              # CI/CD avtomatizatsiyasi
├── locales/
│   ├── ru.json                      # Rus tili tarjimalari
│   └── uz.json                      # O'zbek tili tarjimalari
├── src/
│   ├── app/
│   │   ├── controllers/
│   │   │   ├── admin/
│   │   │   │   ├── LibraryController.js
│   │   │   │   ├── UserController.js
│   │   │   │   └── VideoController.js
│   │   │   ├── auth/
│   │   │   │   └── AuthController.js
│   │   │   ├── config/
│   │   │   │   └── ConfigController.js
│   │   │   ├── student/
│   │   │   │   ├── LibraryController.js
│   │   │   │   └── VideoController.js
│   │   │   └── QuizController.js    # Umumiy Quiz mantiqi
│   │   ├── middlewares/
│   │   │   ├── auditLogger.js        # Admin harakatlarini log qilish
│   │   │   ├── authenticate.js      # JWT tokenni tekshirish
│   │   │   ├── authorize.js         # Rollarni tekshirish (RBAC)
│   │   │   ├── checkBlacklist.js    # Logout bo'lgan tokenlarni tekshirish
│   │   │   ├── errorHandler.js      # Markazlashgan xatolarni ushlash
│   │   │   ├── fileSecurity.js      # Fayl tarkibini (signature) tekshirish
│   │   │   ├── setLang.js           # Accept-Language headerini o'qish
│   │   │   ├── upload.js            # Multer konfiguratsiyasi
│   │   │   └── validate.js          # Joi validation wrapper
│   │   ├── requests/
│   │   │   ├── auth/
│   │   │   │   └── AuthRequest.js    # Login/Register validation
│   │   │   ├── library/
│   │   │   │   └── LibraryRequest.js # Kitob yuklash validation
│   │   │   ├── quiz/
│   │   │   │   └── QuizRequest.js    # Savol va javoblar validation
│   │   │   └── video/
│   │   │       └── VideoRequest.js   # Video URL validation
│   │   ├── resources/
│   │   │   ├── LibraryResource.js    # Kitob ma'lumotlarini formatlash
│   │   │   ├── QuestionResource.js   # Savollarni formatlash
│   │   │   ├── QuizResource.js       # Testlarni formatlash
│   │   │   ├── UserResource.js       # User profilini formatlash
│   │   │   └── VideoResource.js      # Videolarni formatlash
│   │   └── routes/
│   │       └── api/
│   │           └── v1/
│   │               ├── admin.js      # Admin endpointlari
│   │               ├── auth.js       # Auth endpointlari
│   │               ├── config.js     # Ilova sozlamalari endpointlari
│   │               ├── index.js      # V1 router jamlovchisi
│   │               └── student.js    # Talaba endpointlari
│   ├── database/
│   │   ├── migrations/               # PostgreSQL jadvallar tarixi
│   │   ├── models/
│   │   │   ├── AppConfig.js
│   │   │   ├── AuditLog.js
│   │   │   ├── Library.js
│   │   │   ├── Question.js
│   │   │   ├── Quiz.js
│   │   │   ├── RefreshToken.js
│   │   │   ├── Result.js
│   │   │   ├── User.js
│   │   │   └── Video.js
│   │   ├── seeders/                  # Boshlang'ich ma'lumotlar
│   │   ├── config.js                 # Sequelize ulanish sozlamalari
│   │   └── index.js                  # Modellarni export qilish
│   ├── docs/                         # Swagger YAML dokumentatsiyasi
│   │   ├── admin.yaml
│   │   ├── auth.yaml
│   │   ├── components.yaml
│   │   ├── config.yaml
│   │   └── student.yaml
│   ├── infrastructure/
│   │   ├── swagger/
│   │   │   └── swaggerConfig.js      # Swagger-jsdoc sozlamalari
│   │   └── container.js              # Dependency Injection (DI) konteyneri
│   ├── services/                     # Biznes mantiq (Core logic)
│   │   ├── AppConfigService.js
│   │   ├── AuthService.js
│   │   ├── LibraryService.js
│   │   ├── QuizService.js
│   │   ├── UserService.js
│   │   └── VideoService.js
│   ├── utils/                        # Yordamchi utilitalar
│   │   ├── apiFeatures.js            # Pagination va filterlash
│   │   ├── AppError.js               # Maxsus xatolik klassi
│   │   ├── cache.js                  # Redis kesh menejeri
│   │   ├── catchAsync.js             # Try-catch o'rniga ishlatiladi
│   │   ├── constants.js              # O'zgarmas qiymatlar (Regex, Roles)
│   │   ├── envValidator.js           # .env faylini tekshirish
│   │   ├── fileHelper.js             # Fayllarni o'chirish/topish
│   │   ├── healthCheck.js            # DB va Redis holatini tekshirish
│   │   ├── i18n.js                   # Ko'p tilli tizim mantiqi
│   │   ├── logger.js                 # Winston logging tizimi
│   │   ├── storage.js                # Fayllarni diskka yozish/resize
│   │   ├── transactional.js          # DB Transaction decoratori
│   │   └── urlHelper.js              # Fayl linklarini to'g'irlash
│   ├── app.js                        # Express ilovasi (Middleware builder)
│   └── server.js                     # Kirish nuqtasi (Server Runner)
├── tests/
│   ├── integration/                  # API testlari
│   └── unit/                         # Mantiqiy testlar
├── uploads/
│   ├── books/                        # Kitob PDF fayllari
│   ├── covers/                       # Kitob rasmlari
│   ├── thumbnails/                   # Video rasmlari
│   └── videos/                       # Yuklangan videolar (agar bo'lsa)
├── .dockerignore
├── .env                              # Maxfiy muhit o'zgaruvchilari
├── .env.example                      # Namuna muhit o'zgaruvchilari
├── .gitignore
├── .sequelizerc                      # Sequelize yo'nalishlari
├── docker-compose.yml                # Docker Compose fayli
├── Dockerfile                        # Ilova konteynerizatsiyasi
├── ecosystem.config.js               # PM2 sozlamalari
├── package.json                      # Bog'liqliklar va skriptlar
├── package-lock.json
└── README.md                         # Loyiha qo'llanmasi