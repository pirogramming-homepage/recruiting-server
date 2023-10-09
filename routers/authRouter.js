const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const passport = require('passport');

router.post('/login', passport.authenticate('local', {}));

module.exports = router;