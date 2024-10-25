'use strict'
const express = require('express');
const router = express.Router();
const availabilityController = require('../../../controllers/availability');

router.use('/availability', availabilityController);

module.exports = router;
