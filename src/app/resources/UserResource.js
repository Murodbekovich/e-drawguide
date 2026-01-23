class UserResource {
    static format(user) {
        return {
            id: user.id,
            full_name: user.fullName, // TZdagidek nomlash
            phone: user.phone,
            role: user.role,
            created_at: user.createdAt
        };
    }
}

module.exports = UserResource;