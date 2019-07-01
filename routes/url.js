const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  listShortlinks,
  createShortlink,
  updateShortLink,
  redirectOriginal
} = require("../controllers/url");

//prefix: /shortlinks/:userId

//list all user shortlinks
router.get("/", listShortlinks);
// create new shortlink
router.post("/", createShortlink);
// update a shortlink
router.put("/:slug", updateShortLink);

module.exports = router;
