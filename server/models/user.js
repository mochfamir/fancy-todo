const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const helper = require('../helper/helper');

const userScema = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    validate: {
      isAsync: true,
      validator: function(value, cb) {
        Member.findOne({
          email: value
        }, function(err, result) {
          cb(!result, 'Email must unique!')
        })
      },
    },
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email not valid!"]
  },
  password: { type: String, required: true, minlength: [8, 'Minimum password length is 8'] }
});

userScema.pre('save', function(next) {
  let hash = helper.hashPassword(this.password)
  this.password = hash
  next()
})

const User = mongoose.model('User', userScema);


module.exports = User;