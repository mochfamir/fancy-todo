var express = require('express');
var router = express.Router();
const { findAccount } = require('../middleware/middleware');
const { login, register } = require('../controllers/user');
const axios = require('axios');

/* GET users listing. */
router.post('/register', register);
router.post('/login', login);
router.post('/social', findAccount, register, login);

module.exports = router;
