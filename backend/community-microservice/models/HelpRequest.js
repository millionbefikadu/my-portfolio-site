const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String }
});


const helpRequestSchema = new mongoose.Schema({
  author: { type: userSchema, required: true },
  description: { type: String, required: true },
  location: { type: String },
  isResolved: { type: Boolean, default: false },
  volunteers: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

helpRequestSchema.pre('save', function (next) {
  if (this.createdAt && typeof this.createdAt === 'string') {
    this.createdAt = new Date(Number(this.createdAt));
  }
  next();
});


module.exports = mongoose.model('HelpRequest', helpRequestSchema);