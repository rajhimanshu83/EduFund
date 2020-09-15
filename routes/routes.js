const express = require("express");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
require("dotenv").config();

const api_key = process.env.API_KEY;
const sb_api_key = process.env.SB_API_KEY;
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
    // const fetch_response = await fetch(
    //   `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${sb_api_key}`
    // );
    // const data = await fetch_response.json();
    // res.json(data);
  });
  
router.get("/info/:ticker", async (req, res) => {
    const { ticker } = req.params;
    handleGetCompany(req, res,ticker);
    // const response = await fetch(
    //   `https://sandbox.iexapis.com/stable/stock/${ticker}/company?token=${sb_api_key}`
    // );
    // const data = await response.json();
    // console.log(data)
    // res.json(data);
  });
  
router.get("/logo/:ticker", async (req, res) => {
    const { ticker } = req.params;
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/logo?token=${sb_api_key}`
    );
    const data = await response.json();
    res.json(data);
  });
  
router.get("/price/:ticker", async (req, res) => {
    const { ticker } = req.params;
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/price?token=${sb_api_key}`
    );
    const data = await response.json();
    res.json(data);
  });
  
router.get("/news/:ticker", async (req, res) => {
    const { ticker } = req.params;
    const response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/news/last/3?token=${sb_api_key}`
    );
    const data = await response.json();
    res.json(data);
  });
router.post('/signin', (req, res) => { handleSignin(req, res,bcrypt) });
router.post('/register', (req, res) => { handleRegister(req, res) });
router.post('/getuser', (req, res) => { handleGetuser(req, res) });

module.exports = router
