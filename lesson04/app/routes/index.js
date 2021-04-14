const router = require('express').Router();
const userRoute = require('./UserRoute');

router.use(userRoute);

module.exports = router;
