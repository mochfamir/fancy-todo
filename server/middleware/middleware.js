const helper = require('../helper/helper');
const User = require('../models/user');
const Project = require('../models/project');

module.exports = {
  authentication(req, res, next) {
    let decode = helper.decodeToken(req.headers.token)
    User.findOne({
      email: decode.email
    })
      .then(user => {
        req.user = user
        next()
      })
      .catch(err => {
        res.status(400).json({msg: 'Please login!'})
      })
  },
  findUser(req, res, next) {
    User.findOne({
      email: req.body.user
    })
      .then(user => {
        if (user) {
          req.member = user
          next()
        } else {
          res.status(400).json({msg: 'User not found'})
        }
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  },
  findAccount(req, res, next) {
    User.findOne({
      email: req.body.email
    })
      .then(user => {
        req.user = user
        req.socialMedia = true
        if (user) {
          console.log('middleware true')
          req.registered = true
        } else {
          req.registered = false
        }
        next()
      })
      .catch(err => {
        res.status(500).json({msg: 'internal server error', at: 'login'})
      })
  },
  uniqueProjectValidation(req, res, next) {
    Project.findOne({
      name: req.body.name
    })
      .then(project => {
        if (project) res.status(400).json({msg: `Project ${project.name} already registered`})
        else next()
      })
      .catch(err => {
        res.status(500).json({msg: 'Internal server error', at: 'update project'})
      })
  },
  addTodoProject(req, res, next) {
    Project.findOne({
      name: req.body.name
    })
      .then(project => {
        if (project) {
          req.project = project
          next()
        }
        else res.status(500).json({msg: 'Internal server error', at: 'update project'})
      })
      .catch(err => {
        res.status(500).json({msg: 'Internal server error', at: 'update project'})
      })
  } 
}