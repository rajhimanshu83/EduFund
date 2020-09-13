const express = require("express");
const bcrypt = require("bcrypt");

const { handleSignin, handleRegister } = require('../controllers/auth');

const router = express.Router();

// For Testing
router.get('/hello', (req, res, next) => {
    res.json('Hello World');
    next()
});

// APIs
router.post('/signin', (req, res) => { handleSignin(req, res,bcrypt) });
router.post('/register', (req, res) => { handleRegister(req, res) });

module.exports = router
