const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect(
  process.env.DB_CONNECTION_URL,
  {
    KeepAlive: true,
    useNewUrlParser: true
  }
);

module.exports.Url = require("./url");
module.exports.User = require("./user");
