var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

var User = mongoose.model('User', userSchema);


User.comparePassword = function (attemptedPassword, savedPassword, cb) {
  bcrypt.compare(attemptedPassword, savedPassword, this.get('password'), function (err, isMatch) {
    if (err) {
      return cb(err)
    }
    callback(null, isMatch);
  });
};

userSchema.pre('save', function (next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null)
    .bind(this)
    .then(function (hash) {
      this.password = hash;
      next();
    });
});

module.exports = User;
