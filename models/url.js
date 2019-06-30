const mongoose = require("mongoose");
const uniqueValidatorPlugin = require("mongoose-unique-validator");
const immutablePlugin = require("mongoose-immutable");

const urlSchema = mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    immutable: true
  },
  ios: {
    primary: {
      text: String,
      required: true
    },
    fallback: {
      text: String,
      required: true
    }
  },
  android: {
    primary: {
      text: String,
      required: true
    },
    fallback: {
      text: String,
      required: true
    }
  },
  web: {
    type: String,
    required: true
  }
});

urlSchema.plugin(uniqueValidatorPlugin);
urlSchema.plugin(immutablePlugin);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
