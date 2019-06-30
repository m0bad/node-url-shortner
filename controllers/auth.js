const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    // generate  a token for the user
    let { email, username, id } = user;
    let token = jwt.sign(
      {
        id,
        username,
        email
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      username,
      email,
      id,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or emil is already taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let user = await db.User.findOne({ email: req.body.email });
    let { username, email, id } = user;
    let isMatch = await user.comparePasswords(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          email
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        username,
        email,
        id,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email/password"
      });
    }
  } catch (err) {
    return next({ status: 400, message: "Invalid Email/Password" });
  }
};
