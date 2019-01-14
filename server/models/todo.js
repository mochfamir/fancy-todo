var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: String,
  status: {
    type: Boolean,
    default: false
  },
  createdAt: Date,
  dueDate: Date,
  isProject: { type: Boolean, default: false }
});

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo