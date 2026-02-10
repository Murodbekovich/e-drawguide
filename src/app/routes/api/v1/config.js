const express = require('express');
const router = express.Router();
const { configController } = require('../../../../infrastructure/container');

router.get('/check-version', configController.checkVersion);

module.exports = router;