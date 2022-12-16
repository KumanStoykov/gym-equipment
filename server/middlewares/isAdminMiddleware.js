const { jwtVerify } = require('../utils/jwtUtil');
const userService = require('../services/userService');
const { COOKIE_TOKEN_NAME } = require('../config');


module.exports = () => async (req, res, next) => {
    
    try {
        const token = req.cookies[COOKIE_TOKEN_NAME];
        const userVerify = await jwtVerify(token);
        const user = await userService.getById(userVerify._id);
        
        if(user.isAdmin) {
            next();
        } else {
            throw new Error('User is not authorized!');
        }

    } catch(err) {
        res.status(401).send({ message: err.message });
    }
}