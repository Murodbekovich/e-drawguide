const bcrypt = require('bcrypt');
const User = require('../models/User');

async function seedAdmin() {
    try {
        const hashedPassword = await bcrypt.hash('admin123', 12);

        const admin = await User.findOrCreate({
            where: { phone: '998900000000' }, // Admin telefoni
            defaults: {
                fullName: 'Super Admin',
                password: hashedPassword,
                role: 'admin'
            }
        });

        console.log('--- Admin muvaffaqiyatli yaratildi (yoki allaqachon bor) ---');
        process.exit();
    } catch (error) {
        console.error('Seederda xatolik:', error);
        process.exit(1);
    }
}

seedAdmin();