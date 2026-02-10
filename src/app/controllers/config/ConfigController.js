const catchAsync = require('../../../utils/catchAsync');

class ConfigController {
    constructor(appConfigService) {
        this.appConfigService = appConfigService;
    }

    checkVersion = catchAsync(async (req, res) => {
        const { platform, version } = req.query;
        const result = await this.appConfigService.checkUpdate(platform, version);
        res.status(200).json({
            success: true,
            data: result
        });
    });

    index = catchAsync(async (req, res) => {
        const configs = await this.appConfigService.getAllConfigs();
        res.status(200).json({ success: true, data: configs });
    });

    upsert = catchAsync(async (req, res) => {
        const config = await this.appConfigService.updateOrCreateConfig(req.body);
        res.status(200).json({ success: true, data: config });
    });
}

module.exports = ConfigController;