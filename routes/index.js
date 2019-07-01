const express = require("express");
const router = express.Router({ mergeParams: true });
const { redirectOriginal } = require("../controllers/url");

router.get("/", redirectOriginal);

module.exports = router;
