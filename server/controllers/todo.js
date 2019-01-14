const Todo = require('../models/todo');

module.exports = {
  add(req, res) {
    Todo.create({
      name: req.body.name,
      description: req.body.description,
      user: req.user._id,
      dueDate: req.body.dueDate,
      createdAt: new Date
    })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  get(req, res) {
    Todo.find({
      user: req.user._id
    })
      .then(todos => {
        res.status(200).json(todos)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  getOne(req, res) {
    Todo.findById(req.params.id)
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  remove(req, res) {
    Todo.deleteOne({
      _id: req.params.id
    })
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  },
  update(req, res) {
    Todo.updateOne({
      _id: req.params.id
    }, req.body)
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}