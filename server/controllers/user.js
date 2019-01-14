const User = require('../models/user');
const helper = require('../helper/helper');

module.exports = {
  register(req, res, next) {
    if (req.registered) next()
    else {
      if (req.socialMedia) req.body.password = 'bBeybvSHEfy7e'
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
        .then(user => {
          if (req.socialMedia) {
            next()
          } else {
            res.status(201).json(user)
          }
        })
        .catch(err => {
          res.status(400).json(err.message)
        })
    }
  },
  login(req, res) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        if (user) {
          if (!req.socialMedia) {
            if (helper.comparePassword(req.body.password, user.password)) {
              let token = helper.generateToken(user._id, user.email)
              res.status(200).json({
                accessToken: token,
                user: user
              })
            } else {
              res.status(400).json({err: 'Wrong password!'})
            }
          } else {
            let token = helper.generateToken(user._id, user.email)
            res.status(200).json({
              accessToken: token,
              user: user
            })
          }
        } else {
          res.status(400).json({err: 'User not found'})
        }
      })
      .catch(err => {
        res.status(400).json(err.message)
      })
  }
}