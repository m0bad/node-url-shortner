const shortId = require("shortid");
const db = require("../models");
var validator = require("validator");

// function that takes any number of urls
// return true if all URLs are in valid forms
const validateUrl = (...args) => {
  let valid = true;
  args.map(url => {
    valid = validator.isURL(url) === valid;
  });
  return valid;
};

exports.listShortlinks = async (req, res, next) => {
  try {
    // find the user
    let user = await db.User.findOne({ username: req.params.username });
    // extract the user shortlinks
    if (user.shortlinks) {
      let shortLinksList = [];
      let userShortlinks = user.shortlinks.map(async link => {
        let shortlink = await db.Url.findById(link);
        shortLinksList.push(shortlink);
      });
      await Promise.all(userShortlinks);
      return res.status(200).json(shortLinksList);
    }
    return res.status(200).json([]);
  } catch (err) {
    return next(err);
  }
};

exports.createShortlink = async (req, res, next) => {
  try {
    // find the user
    let user = await db.User.findOne({ username: req.params.username });
    const slug = req.body.slug || shortId.generate();
    const {
      android_primary,
      android_fallback,
      ios_primary,
      ios_fallback,
      web,
      test
    } = req.body;
    // validating all the urls sent in body
    if (
      validateUrl(
        android_primary,
        android_fallback,
        ios_primary,
        ios_fallback,
        web
      )
    ) {
      // create the url and added to user shortlinks
      let url = await db.Url.create({
        slug,
        android: {
          primary: android_primary,
          fallback: android_fallback
        },
        ios: {
          primary: ios_primary,
          fallback: ios_fallback
        },
        web,
        user
      });
      user.shortlinks.push(url);
      await user.save();
      const shortUrl = "http://localhost:3000/" + url.slug;
      return res.status(200).json(shortUrl);
    } else {
      return next({
        status: 400,
        message: "please enter a valid URLs"
      });
    }
  } catch (err) {
    return next(err);
  }
};

// handling update casses
// Only sent attr will be updated, other will stay as is
exports.updateShortLink = async (req, res, next) => {
  try {
    const {
      web,
      ios_primary,
      ios_fallback,
      android_primary,
      android_fallback
    } = req.body;
    let url = await db.Url.findOne({ slug: req.params.slug });
    const query = { slug: req.params.slug };
    await db.Url.findOneAndUpdate(
      query,
      {
        web: web || url.web,
        ios: {
          primary: ios_primary || url.ios.primary,
          fallback: ios_fallback || url.ios.fallback
        },
        android: {
          primary: android_primary || url.android.primary,
          fallback: android_fallback || url.android.fallback
        }
      },
      { new: true }, // to return the modified document rather than the original
      (err, updatedUrl) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json(updatedUrl);
      }
    );
  } catch (err) {
    return next(err);
  }
};

exports.redirectOriginal = async (req, res, next) => {
  try {
    let url = await db.Url.findOne({ slug: req.params.slug });
    // customizing the response based on the client device
    let device_type = req.device.type.toUpperCase();
    switch (device_type) {
      case "DESKTOP":
        console.log(url.web);
        const originalUrl = +url.web;
        return res.status(301).redirect(originalUrl);
      case "PHONE":
        if (req.device.name === "iPhone") {
          return res.redirect(url.ios.primary);
        }
        return res.redirect(url.android.primary);

      default:
        return res.redirect(url.web);
    }
  } catch (err) {
    return next(err);
  }
};

exports.deleteShortLink = async (req, res, next) => {
  try {
    let shortlink = await db.Url.findOne({ slug: req.params.slug });
    await shortlink.remove();
    return res.status(200).json(shortlink);
  } catch (err) {
    return next(err);
  }
};
