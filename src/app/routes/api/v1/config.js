const express = require('express');
const router = express.Router();
const ConfigController = require('../../../controllers/config/ConfigController');

router.get('/check-version', ConfigController.checkVersion);

module.exports = router;