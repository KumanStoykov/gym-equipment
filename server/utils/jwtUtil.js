const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');

exports.createToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, { expiresIn: '120m' }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

exports.jwtVerify = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if(err) {
                reject(err);
            } else {
                 resolve(decodedToken);
            }
        });
    });
};