module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log yozish (dasturchi ko'rishi uchun)

    const statusCode = err.statusCode || 500;
    const message = err.message || "Serverda ichki xatolik yuz berdi";

    res.status(statusCode).json({
        success: false,
        message: message,
        // Faqat development rejimida xato qayerdaligini ko'rsatish
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};