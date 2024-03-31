const mongoose = require('mongoose');

const problemReportSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const ProblemReport = mongoose.model('ProblemReport', problemReportSchema);

module.exports = ProblemReport;
