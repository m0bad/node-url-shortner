const mongoose = require("mongoose");
const uniqueValidatorPlugin = require("mongoose-unique-validator");
const immutablePlugin = require("mongoose-immutable");
const User = require("./user");

const urlSchema = mongoose.Schema({
  slug: {
    type: String,
    unique: true,
    immutable: true
  },
  ios: {
    primary: {
      type: String,
      required: true
    },
    fallback: {
      type: String,
      required: true
    }
  },
  android: {
    primary: {
      type: String,
      required: true
    },
    fallback: {
      type: String,
      required: true
    }
  },
  web: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const clearUserRecords = async (userId, urlId) => {
  let user = await User.findById(userId);
  user.shortlinks.remove(urlId);
  await user.save();
};
// clear the database records on deleting
urlSchema.pre("remove", async function(next) {
  try {
    await clearUserRecords(this.user, this._id);
    return next();
  } catch (err) {
    return next(err);
  }
});

urlSchema.plugin(uniqueValidatorPlugin);
urlSchema.plugin(immutablePlugin);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
