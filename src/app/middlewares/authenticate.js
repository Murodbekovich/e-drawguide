const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token || !token.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Token topilmadi!' });
        }

        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(401).json({ message: 'Foydalanuvchi mavjud emas' });

        req.user = user; // Keyingi controllerlar uchun foydalanuvchini saqlaymiz
        next();
    } catch (err) {
        res.status(401).json({ message: 'Avtorizatsiya xatosi!' });
    }
};