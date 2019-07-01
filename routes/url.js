const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  listShortlinks,
  createShortlink,
  updateShortLink,
  redirectOriginal
} = require("../controllers/url");
const { isLoggedIn, hasLinkOwnership } = require("../middlewares");

//prefix: /shortlinks/:userId

//list all user shortlinks
router.get("/", isLoggedIn, listShortlinks);
// create new shortlink
router.post("/", isLoggedIn, createShortlink);
// update a shortlink
router.put("/:slug", isLoggedIn, hasLinkOwnership, updateShortLink);

module.exports = router;
