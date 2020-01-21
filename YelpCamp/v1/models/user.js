const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

//UserSchema
const UserSchema = mongoose.Schema({
  username: String,
  password: String
});

//plugin para usar alguns metódos do passport
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
