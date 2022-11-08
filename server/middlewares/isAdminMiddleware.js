const userService = require('../services/userService');


module.exports = () => async (req, res, next) => {

    try {
        const userId = req.user._id;

        const user = await userService.getById(userId);

        if(user.isAdmin) {

            next();
        } else {
            throw new Error('User is not authorized!');
        }

    } catch(err) {
        res.status(401).send({ message: err.message });
    }
}