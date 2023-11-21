const express = require('express');

const router = express.Router();
const userRoute = require('./userRoutes');
const reportRoute = require('./reportRoutes');
const authenticateToken = require('../../helper/middleware');

router.use('/user', userRoute);
router.use('/report', authenticateToken, reportRoute);
module.exports = router;
