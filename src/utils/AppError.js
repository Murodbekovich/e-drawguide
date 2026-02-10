class AppError extends Error {
    constructor(message, statusCode, errorCode = 'INTERNAL_ERROR', isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        Error.captureStackTrace(this, this.constructor);
    }

    static BadRequest(message, errorCode = 'BAD_REQUEST') {
        return new AppError(message, 400, errorCode);
    }

    static Unauthorized(message = 'Iltimos, tizimga kiring', errorCode = 'UNAUTHORIZED') {
        return new AppError(message, 401, errorCode);
    }

    static Forbidden(message = 'Sizda ruxsat yo\'q', errorCode = 'FORBIDDEN') {
        return new AppError(message, 403, errorCode);
    }

    static NotFound(message = 'Resurs topilmadi', errorCode = 'NOT_FOUND') {
        return new AppError(message, 404, errorCode);
    }

    static Conflict(message, errorCode = 'CONFLICT') {
        return new AppError(message, 409, errorCode);
    }
}

module.exports = AppError;