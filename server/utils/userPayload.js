exports.userPayload = (user) => {
    return {
        _id: user._id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        address: user.address || '',
        isAdmin: user.isAdmin
    };
};