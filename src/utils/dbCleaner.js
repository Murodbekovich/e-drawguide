const sequelize = require('../database/index');
async function clean() {
    await sequelize.sync({ force: true });
    console.log("Baza tozalandi!");
    process.exit();
}
clean();