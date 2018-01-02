const router = require('express').Router();

router.use('/users', require('./user'));

router.use('/stories', require('./story'));

router.use('/controls', require('./control'));

router.use('/sections', require('./section'));

router.use('/policies', require('./policy'));

router.use('/savePoint', require('./savePoint'));


module.exports = router;
