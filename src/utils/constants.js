const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ROLES = {
    ADMIN: 'admin',
    STUDENT: 'student'
};

const LANGUAGES = ['uz', 'ru', 'en'];

module.exports = {
    PASSWORD_REGEX,
    ROLES,
    LANGUAGES
};