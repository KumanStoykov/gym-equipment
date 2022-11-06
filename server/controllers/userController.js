const router = require('express').Router();
const bcrypt = require('bcrypt');

const userService = require('../services/userService');
const jwtUtil = require('../utils/jwtUtil');
const { userPayload } = require('../utils/userPayload');
const { ROUND_SALT, COOKIE_TOKEN_NAME } = require('../config');
const validators = require('../validators');


router.post('/register', async (req, res) => {

    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();
        const repeatPassword = req.body.repeatPassword.trim();

        if (!validators.isEmail(email)) {
            throw new Error('The email should be in correct format!');
        }

        if (!password.length > 6) {
            throw new Error('Password should be at last 6 characters long!');
        }

        if (!password === repeatPassword) {
            throw new Error('Repeat password should be equal to password!');
        }

        const emailIsTaken = await userService.getByEmail(email);

        if (emailIsTaken) {
            throw new Error('Email is taken!');
        }

        const hashPass = await bcrypt.hash(password, ROUND_SALT);

        const user = await userService.createUser({ email, hashPass, isAdmin: false });

        const token = await jwtUtil.createToken(user);

        res.cookie(COOKIE_TOKEN_NAME, token, { httpOnly: true });

        const userData = userPayload(user);

        res.status(200).send({ userData });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});
router.post('/login', async (req, res) => {

    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        if (!validators.isEmail(email)) {
            throw new Error('The email should be in correct format!');
        }

        if (!password.length > 6) {
            throw new Error('Password should be at last 6 characters long!');
        }

        const user = await userService.getByEmail(email);

        if (!user) {
            throw new Error('Email or password don\'t match!');
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new Error('Email or password don\'t match!');
        }

        const token = await jwtUtil.createToken(user);

        res.cookie(COOKIE_TOKEN_NAME, token, { httpOnly: true });

        const userData = userPayload(user);

        res.status(200).send({ userData });

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_TOKEN_NAME);
    res.status(200).send({ message: 'Successful logged out' });
});

module.exports = router;