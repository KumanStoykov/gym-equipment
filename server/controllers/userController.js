const router = require('express').Router();
const bcrypt = require('bcrypt');

const userService = require('../services/userService');
const jwtUtil = require('../utils/jwtUtil');
const { userPayload } = require('../utils/userPayload');
const { ROUND_SALT, COOKIE_TOKEN_NAME } = require('../config');
const validators = require('../validators');

const checkCredential = require('../middlewares/checkCredentialMiddleware');
const loggedIn = require('../middlewares/loggedInMiddleware');


router.get('/check-user', checkCredential(), async (req, res) => {
    try {
        let user = {};

        if (req?.user) {
            user = await userService.getById(req.user._id);
        }

        if (!req?.user) {
            throw new Error('User token is invalid!');
        }

        const userData = userPayload(user);

        res.status(200).send(userData);

    } catch (error) {
        res.clearCookie(COOKIE_TOKEN_NAME);
        res.status(401).send({ message: error.message });
    }
});
router.get('/check-user/:id', checkCredential(), async (req, res) => {
    try {
        let user = {};
        if (req?.user._id !== req.params.id) {
            throw new Error('User is unauthorized!');

        }

        user = await userService.getById(req.user._id);


        const userData = userPayload(user);

        res.status(200).send(userData);

    } catch (error) {
        res.clearCookie(COOKIE_TOKEN_NAME);
        res.status(401).send({ message: error.message });
    }
});


router.post('/register', async (req, res) => {

    try {
        const email = req.body.email.trim();
        const password = req.body.password.trim();

        if (!validators.isEmail(email)) {
            throw new Error('The email should be in correct format!');
        }

        if (!password.length > 6) {
            throw new Error('Password should be at last 6 characters long!');
        }

        const emailIsTaken = await userService.getByEmail(email);

        if (emailIsTaken) {
            throw new Error('Email is taken!');
        }

        const hashPass = await bcrypt.hash(password, ROUND_SALT);

        const user = await userService.createUser({ email, password: hashPass, isAdmin: false });

        const token = await jwtUtil.createToken(user);

        res.cookie(COOKIE_TOKEN_NAME, token, { httpOnly: true });

        const userData = userPayload(user);

        res.status(200).send(userData);

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

        res.status(200).send(userData);

    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

router.put('/edit/:userId', loggedIn(), async (req, res) => {
    try {
        const userId = req.params.userId;

        const firstName = req.body?.firstName.trim() || '';
        const lastName = req.body?.lastName.trim() || '';
        const email = req.body?.email.trim();
        const address = req.body?.address.trim() || '';
        const phone = req.body?.phone.trim() || '';

        if (email.length == 0) {
            throw new Error('Email is required!');
        }

        const editUser = await userService.editUser(userId, { firstName, lastName, email, address, phone });

        const user = userPayload(editUser);

        res.status(200).send(user);

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.delete('/delete/:userId', loggedIn(), async (req, res) => {
    try {
        res.clearCookie(COOKIE_TOKEN_NAME);
        const userId = req.params.userId;

        await userService.deleteUser(userId);

        res.status(200).send({ message: 'User successful deleted!' });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

router.get('/logout', loggedIn(), (req, res) => {
    res.clearCookie(COOKIE_TOKEN_NAME);
    res.status(200).send({ message: 'Successful logged out' });
});

module.exports = router;