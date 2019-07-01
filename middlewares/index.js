require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "Please Login First"
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: "Please Login First"
    });
  }
};

exports.hasLinkOwnership = async (req, res, next) => {
  try {
    const user = await db.User.findOne({ username: req.params.username });
    const shortlink = await db.Url.findOne({ slug: req.params.slug });
    let has_ownership = user.shortlinks.includes(shortlink._id);
    if (has_ownership) {
      return next();
    } else {
      return next({
        status: 401,
        message: "Unauthorized"
      });
    }
  } catch (err) {
    return next({
      status: 401,
      message: "Unauthorized"
    });
  }
};
