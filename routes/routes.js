const express = require("express");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

const api_key = "Tpk_c548b69f38f242c2ba5d20305003a574";
const sb_api_key = "Tpk_c548b69f38f242c2ba5d20305003a574";
const { handleSignin, handleRegister, handleGetuser,handleGetCompany,handleGetStockInfo } = require('../controllers/auth');

const router = express.Router();

// For Testing
router.get('/hello', (req, res, next) => {
    res.json('Hello World');
    next()
});


// APIs
router.get("/dailydata/:ticker/:time", async (req, res) => {
    const { ticker, time } = req.params;
    handleGetStockInfo(req,res,ticker,time);
  });
  
router.get("/info/:ticker", async (req, res) => {
    const { ticker } = req.params;
    handleGetCompany(req, res,ticker);
  });
  
router.post('/signin', (req, res) => { handleSignin(req, res,bcrypt) });
router.post('/register', (req, res) => { handleRegister(req, res) });
router.post('/getuser', (req, res) => { handleGetuser(req, res) });

module.exports = router
