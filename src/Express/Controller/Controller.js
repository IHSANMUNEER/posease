
const { addTips,addReport,addDocters } = require("../addData"); 
const Tip  = require("../Model/TipSchema");
const Report = require("../Model/ProblemSchema");
const Doctors = require("../Model/DoctorsSchema");

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





module.exports = {addTipsData , allTips , addReportData ,addDoctersData ,allDoctors };
