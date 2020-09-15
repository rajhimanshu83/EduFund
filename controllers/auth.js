const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const StockHistory = require('../models/StockHistories');
const Stock = require('../models/Stock');
const keys = require('../config/keys');
const moment = require('moment');
const fetch = require("node-fetch");

require("dotenv").config();

const api_key = process.env.API_KEY;
const sb_api_key = process.env.SB_API_KEY;
// User Register
module.exports.handleRegister = (req, res) => {
	const { email, username, password } = req.body;
    console.log( email, username, password);
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
		//   errors.email = 'Email already exists';
		  return res.status(400).json('Email already exists');
		} else {
		  const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		  });
		  bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
			  if (err) throw err;
			  newUser.password = hash;
			  newUser
				.save()
				.then((user) => res.json(user))
				.catch((err) => console.log(err));
			});
		  });
		}
	  });	
}

// User Signin
module.exports.handleSignin = async (req, res, bcrypt) => {
	const { email, password } = req.body;
    console.log(email, password)
	if ( !email || !password ) {
		return res.status(400).json('incorrect form submission');
	}
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) {
    //   errors.email = 'User not found';
      return res.status(404).json('User not found');
    }
    // Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, username: user.username }; // Create JWT Payload
        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          async (err, token) => {
			await User.findOneAndUpdate({ email : email},{ $set: {token:token} });
            res.json({
              success: true,
			  token: token,
			  user: {username: user.username}
            });
          }
        );
      } else {
        // errors.password = 'Password incorrect';
        return res.status(400).json('Password incorrect');
      }
    });
  });
}

// User Getuser
module.exports.handleGetuser = async (req, res) => {
	const { token } = req.body;
	if ( !token ) {
		return res.status(400).json('Invalid Token');
	}
  // Find user by email
  User.findOne({ token }).then((user) => {
    // Check for user
    if (!user) {
    //   errors.email = 'User not found';
      return res.status(404).json('User not found');
    }
	// Check Password
    res.json({
		success: true,
		token: user.token,
		user: {username: user.username}
	  });
  });
}

module.exports.handleGetCompany = async (req, res,ticker) => {
	// const { token } = req.body;
	// if ( !token ) {
	// 	return res.status(400).json('Invalid Token');
	// }
  // Find user by email
  Stock.findOne({ symbol:ticker }).then((stock) => {
    // Check for user
    if (!stock) {
    //   errors.email = 'User not found';
      return res.status(404).json('Stock not found');
    }
	// Check Password
    res.json(stock);
  });
}
module.exports.handleGetStockInfo = async (req,res,ticker,time) => {
	// const { token } = req.body;
	// if ( !token ) {
	// 	return res.status(400).json('Invalid Token');
	// }
  // Find user by email
  let startDate;
  let endDate;
  switch(time) {
	case "1D":
	startDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
	break;
	case "1m":
	startDate = moment().subtract(1, 'months').format("YYYY-MM-DD");
	break;
	case "1y":
	startDate = moment().subtract(1, 'years').format("YYYY-MM-DD");
	break;
	case "5y":
	startDate = moment().subtract(5, 'years').format("YYYY-MM-DD");
	break;
	default:
	console.log("invalidDate")
	  // code block
  }
  const stocks = await StockHistory.find({ symbol:ticker, date:{$gte:startDate} });
  if (stocks.length == 0) {
	const fetch_response = await fetch(
      `https://sandbox.iexapis.com/stable/stock/${ticker}/chart/${time}?token=${sb_api_key}`
    );
    const data = await fetch_response.json();
    return res.json(data);
	}
	// console.log(stocks)
	// Check Password
    res.json(stocks);
}

// User Logout
module.exports.handleLogout = (req, res, db, bcrypt) => {
	const { id } = req.params;
	if ( !id ) {
		return res.status(400).json('incorrect form submission');
	}

	db('users').where({ id })
	.update({
		status: 'offline',
	})
	.returning('*')
	.then((result) => {
		return res.status(200).json(result);
	})
	.catch((err) => res.status(400).json('Unable to log out'))
	
}