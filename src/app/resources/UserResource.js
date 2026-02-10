const BaseResource = require('./BaseResource');

class UserResource {
    static format(user) {
        if (!user) return null;
        return {
            id: user.id,
            full_name: user.full_name,
            phone: user.phone,
            role: user.role,
            created_at: user.created_at
        };
    }

    static collection(data) {
        return BaseResource.collection(data, this.format);
    }
}

module.exports = UserResource;