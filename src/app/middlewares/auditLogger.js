const { AuditLog } = require('../../database');
const logger = require('../../utils/logger');

const maskSensitiveData = (data) => {
    if (!data || typeof data !== 'object') return data;
    const sensitiveFields = ['password', 'token', 'refresh_token', 'access_token', 'old_password', 'new_password'];
    const masked = Array.isArray(data) ? [...data] : { ...data };

    Object.keys(masked).forEach(key => {
        if (sensitiveFields.includes(key.toLowerCase())) {
            masked[key] = '********';
        } else if (typeof masked[key] === 'object') {
            masked[key] = maskSensitiveData(masked[key]);
        }
    });

    return masked;
};

module.exports = (resource) => (req, res, next) => {
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        return next();
    }

    const payload = {
        body: { ...req.body },
        query: { ...req.query },
        params: { ...req.params }
    };

    res.on('finish', async () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            setImmediate(async () => {
                try {
                    const resourceId = req.params.id || req.body.id || null;
                    const sanitizedChanges = maskSensitiveData(payload);

                    await AuditLog.create({
                        user_id: req.user ? req.user.id : null,
                        action: req.method,
                        resource: resource,
                        resource_id: resourceId ? String(resourceId) : null,
                        changes: sanitizedChanges,
                        ip_address: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
                        user_agent: req.headers['user-agent']
                    });
                } catch (err) {
                    logger.error('AuditLog Error:', err);
                }
            });
        }
    });

    next();
};