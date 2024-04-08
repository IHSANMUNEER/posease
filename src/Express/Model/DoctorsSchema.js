const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  education: {
    type: [String],
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  profileLink: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
