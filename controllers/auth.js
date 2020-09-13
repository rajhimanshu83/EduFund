const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys');

// User Register
module.exports.handleRegister = (req, res) => {
	const { email, name, password } = req.body;
    console.log( email, name, password);
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
		//   errors.email = 'Email already exists';
		  return res.status(400).json('Email already exists');
		} else {

		  const newUser = new User({
			name: req.body.name,
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
        const payload = { id: user.id, name: user.name }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
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