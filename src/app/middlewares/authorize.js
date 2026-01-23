module.exports = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Sizda ushbu amalni bajarish uchun ruxsat yo'q (Faqat Admin uchun)!"
            });
        }
        next();
    };
};