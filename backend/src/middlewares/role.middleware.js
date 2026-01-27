const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: No user found' });
        }

        if (roles.length && !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        }

        next();
    };
};

const isAdmin = authorize('admin');
const isShop = authorize('shop');
const isUser = authorize('user');

module.exports = {
    authorize,
    isAdmin,
    isShop,
    isUser
};
