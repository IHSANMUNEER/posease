const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  doctorName: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  education: {
    type: [String],
    required: true
  }
});

const Doctor = mongoose.model('Doctors', doctorSchema);

module.exports = Doctor;
