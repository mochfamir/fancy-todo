const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  todo: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  name: {
    type: String,
    required: true
  }
})

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;