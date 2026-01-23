const User = require('../database/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
    async register(data) {
        const { fullName, phone, password } = data;

        // Telefon raqam bandligini tekshirish
        const candidate = await User.findOne({ where: { phone } });
        if (candidate) throw new Error('Bu telefon raqami allaqachon mavjud');

        // Parolni shifrlash
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            fullName,
            phone,
            password: hashedPassword
        });

        return this.generateToken(user);
    }

    async login(phone, password) {
        const user = await User.findOne({ where: { phone } });
        if (!user) throw new Error('Foydalanuvchi topilmadi');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Parol noto\'g\'ri');

        return this.generateToken(user);
    }

    generateToken(user) {
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
        );

        const userResponse = user.toJSON();
        delete userResponse.password; // Maxfiy ma'lumotni o'chirib yuboramiz

        return { user: userResponse, access_token: token };
    }
}

module.exports = new AuthService();