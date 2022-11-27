const { jwtVerify, createToken } = require('../utils/jwtUtil');

const { COOKIE_TOKEN_NAME, SECRET } = require('../config');

module.exports = () => async (req, res, next) => {
    const token = req.cookies[COOKIE_TOKEN_NAME];

    try {
        const user = await jwtVerify(token, SECRET);
        //  res.cookies(COOKIE_TOKEN_NAME, createToken(user), { httpOnly: true });

        req.user = user;
        next();

    } catch(err) {
        res.user = undefined;
        next();
    }
}