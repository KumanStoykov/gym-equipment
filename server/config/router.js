const router = require('express').Router();

const userController = require('../controllers/userController');
const benchController = require('../controllers/benchController');
const bikeController = require('../controllers/bikeController');
const dumbbellController = require('../controllers/dumbbellController');
const rackController = require('../controllers/rackController');
const treadmillsController = require('../controllers/treadmillsController');

router.use('/user', userController);
router.use('/bench', benchController);
router.use('/bike', bikeController);
router.use('/dumbbell', dumbbellController);
router.use('/rack', rackController);
router.use('/treadmill', treadmillsController);

module.exports = router;