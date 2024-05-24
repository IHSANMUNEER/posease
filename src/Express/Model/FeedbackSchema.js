const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  feedbackText: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
