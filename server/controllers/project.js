const Project = require('../models/project');

module.exports = {
  create(req, res) {
    Project.create({
      todo: req.body.todo,
      user: req.user._id,
      name: req.body.name
    })
      .then(project => {
        res.status(201).json(project)
      })
      .catch(err => {
        res.status(400).json({msg: err.message})
      })
  },
  getAll(req, res) {
    Project.find({
      user: req.user._id
    }).populate('todo').populate('user')
      .then(projects => {
        res.status(200).json(projects)
      })
      .catch(err => {
        res.status(400).json({err: err.message})
      })
  },
  getOne(req, res) {
    Project.findOne({
      _id: req.params.id
    }).populate('user')
      .then(project => {
        res.status(200).json(project)
      })
      .catch(err => {
        res.status(400).json({err: err.message})
      })
  },
  updateTodo(req, res) {
    Project.findOne({
      name: req.params.name
    })
      .then(project => {
        project.todo.push(req.body.todo)
        return Project.updateOne({
          name: req.params.name
        }, {
          todo: project.todo
        })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({msg: 'Internal server error', at: 'update project'})
      })
  },
  updateMember(req, res) {
    Project.findOne({
      _id: req.params.id
    })
      .then(project => {
        console.log(req.member._id)
        project.user.push(req.member._id)
        return Project.updateOne({
          _id: req.params.id
        }, {
          user: project.user
        })
      })
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        res.status(500).json({msg: err.message})
      })
  }
}