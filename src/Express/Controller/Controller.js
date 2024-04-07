
const { addTips,addReport,addDocters } = require("../addData"); 
const Tip  = require("../Model/TipSchema");
const Report = require("../Model/ProblemSchema");
const Doctors = require("../Model/DoctorsSchema");
const Feedback = require("../Model/FeedbackSchema");

const addTipsData = async (req, res) => {
    try {
        await addTips();
        res.status(200).json({ msg: "Tips data added successfully" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const allTips = async (req, res) => {
    try {
        const tips = await Tip.find({});
        res.status(200).json({ tips });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const addReportData = async (req, res) => {
    try {
        const { description } = req.body || {}; 
        const report = new Report({ description });
        await report.save();
        res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const addDoctersData =  async (req, res) => {
    try {
        await addDocters();
        res.status(200).json({ msg: "Doctors data added successfully" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const allDoctors = async (req, res) => {
    try {
        const tips = await Doctors.find({});
        res.status(200).json({ tips });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const addFeedbackData = async (req, res) => {
    try {
      const { feedbackText, imageUrl, rating, uid } = req.body || {}; // Ensure uid is correctly extracted
      const feedback = new Feedback({ feedbackText, imageUrl, rating, uid }); // Use uid
      await feedback.save();
      res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  const getFeedbackData = async (req, res) => {
    try {
        const { uid } = req.query;
        const tips = await Feedback.find({ uid: uid });
        res.status(200).json({ tips });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};






module.exports = {addTipsData , allTips , addReportData ,addDoctersData ,allDoctors ,addFeedbackData ,getFeedbackData};
