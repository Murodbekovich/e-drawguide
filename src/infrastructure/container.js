const AuthService = require('../services/AuthService');
const UserService = require('../services/UserService');
const LibraryService = require('../services/LibraryService');
const VideoService = require('../services/VideoService');
const QuizService = require('../services/QuizService');
const AppConfigService = require('../services/AppConfigService');

const AuthController = require('../app/controllers/auth/AuthController');
const UserController = require('../app/controllers/admin/UserController');
const LibraryAdminController = require('../app/controllers/admin/LibraryController');
const VideoAdminController = require('../app/controllers/admin/VideoController');
const QuizController = require('../app/controllers/QuizController');
const ConfigController = require('../app/controllers/config/ConfigController');
const LibraryStudentController = require('../app/controllers/student/LibraryController');
const VideoStudentController = require('../app/controllers/student/VideoController');

const services = {
    authService: AuthService,
    userService: UserService,
    libraryService: LibraryService,
    videoService: VideoService,
    quizService: QuizService,
    appConfigService: AppConfigService
};

const controllers = {
    authController: new AuthController(services.authService, services.userService),
    userController: new UserController(services.userService),
    adminLibraryController: new LibraryAdminController(services.libraryService),
    adminVideoController: new VideoAdminController(services.videoService),
    quizController: new QuizController(services.quizService),
    configController: new ConfigController(services.appConfigService),
    studentLibraryController: new LibraryStudentController(services.libraryService),
    studentVideoController: new VideoStudentController(services.videoService)
};

module.exports = controllers;