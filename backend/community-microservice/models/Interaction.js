const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  input: String,
  response: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Interaction = mongoose.model('Interaction', interactionSchema);
module.exports = Interaction;
