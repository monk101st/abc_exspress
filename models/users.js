const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")


const usersSchema = new Schema({
    loginName: {type: String, required: true},
    userPassword: {type: String, required: true},
    firstName: {type: String, required: true},
    familyName: {type: String, required: true},
    userEmail: {type: String, required: true},
    bornDate: {type: Date, required: true},
    ruleActepted: {type: Boolean, required: false},
    created: {type: Date, default: Date.now},
    lastEdit: {type: Date, default: Date.now},
    userAvatar: {type: String, default: 'nopicture'},
    userRole: {type: String, default: 'norole'}
});

usersSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("userPassword") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.userPassword, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.userPassword = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })

  usersSchema.methods.comparePassword = function(userPassword, callback) {
    bcrypt.compare(userPassword, this.userPassword, function(error, isMatch) {
      if (error) {
        return callback(error)
      } else {
        callback(null, isMatch)
      }
    })
  }
module.exports = mongoose.model('Users', usersSchema);