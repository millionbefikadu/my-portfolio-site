const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String }
});

const communityPostSchema = new mongoose.Schema({
  author: { type: userSchema, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, enum: ['news', 'discussion'] },
  aiSummary: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

communityPostSchema.pre('save', function (next) {
  if (this.createdAt && typeof this.createdAt === 'string') {
    this.createdAt = new Date(Number(this.createdAt));
  }
  next();
});

module.exports = mongoose.model('CommunityPost', communityPostSchema);