const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect(
  "mongodb://localhost/urlShortener",
  {
    KeepAlive: true,
    useNewUrlParser: true
  }
);

module.exports.Url = require("./url");
