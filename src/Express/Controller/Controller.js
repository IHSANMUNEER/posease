
const { addTips,addReport,addDocters } = require("../addData"); 
const Tip  = require("../Model/TipSchema");
const Report = require("../Model/ProblemSchema");
const Doctors = require("../Model/DoctorsSchema");
const Feedback = require("../Model/FeedbackSchema");
const addNotification = require("../Model/SendNotification")
const admin = require('firebase-admin');

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

const createNotification = async (req, res) => {
    try {
      const { title, description } = req.body;
      const newNotification = new addNotification({
        title,
        description
      });
      await newNotification.save();
      return res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getActiveNotifications = async (req, res) => {
    try {
        const currentTime = new Date();
        const activeNotifications = await addNotification.find({ expiresAt: { $gte: currentTime } });
        res.status(200).json({ activeNotifications });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  const getAllNotifications = async (req, res) => {
    try {
        
        const allNotifications = await addNotification.find({ });
        res.status(200).json({ allNotifications });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  const getAllProblems = async (req, res) => {
    try {
        
const Report = require("../Model/ProblemSchema");
        const allProblems = await Report.find({ });
        res.status(200).json({ allProblems });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const adminTipCreation = async (req, res) => {
    try {
      const { id, title, subtitle, image } = req.body;
  
      const newNotification = new Tip({
        id,
        title,
        subtitle,
        image
      });
  
      const savedNotification = await newNotification.save();
  
      res.status(201).json(savedNotification);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const adminDocCreation = async (req, res) => {
    try {
      const { id,image,name,education,experience,specialization,rating,profileLink,location } = req.body;
  
      const newDoctors = new Doctors({
        id,
        image,
        name,
        education,
        experience,
        specialization,
        rating,
        profileLink,
        location
      });
  
      const savedDoctors = await newDoctors.save();
  
      res.status(201).json(savedDoctors);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getUsers = async (req, res) => {
    try {
        const userList = await admin.auth().listUsers();
        const users = userList.users.map((userRecord) => userRecord.toJSON());
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getUsersCount = async (req, res) => {
    try {
      const userList = await admin.auth().listUsers();
      const userCount = userList.users.length;
      res.json({ userCount });
    } catch (error) {
      console.error('Error counting users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const deleteUser = async (req, res) => {
    try {
        console.log('deleteUser')
      const userId = req.query.userId;
      await admin.auth().deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteTip = async (req, res) => {
    try {
      const tipId = req.body.userId; // Get the tip ID from the request body
      const deletedTip = await Tip.deleteOne({ _id: tipId });
      if (deletedTip.deletedCount === 1) {
        res.status(200).json({ message: 'Tip deleted successfully' });
      } else {
        res.status(404).json({ message: 'Tip not found' });
      }
    } catch (error) {
      console.error('Error deleting tip:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const deleteDoctor = async (req, res) => {
    try {
      const docId = req.body.userId; 
      const deletedDoc = await Doctors.deleteOne({ _id: docId });
      if (deletedDoc.deletedCount === 1) {
        res.status(200).json({ message: 'Tip deleted successfully' });
      } else {
        res.status(404).json({ message: 'Tip not found' });
      }
    } catch (error) {
      console.error('Error deleting tip:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
    addTipsData , allTips , addReportData ,
    addDoctersData ,allDoctors ,addFeedbackData ,
    getFeedbackData ,createNotification,getActiveNotifications,
    adminTipCreation,adminDocCreation,getAllNotifications,getAllProblems,getUsers,
    getUsersCount,deleteUser,deleteTip,deleteDoctor};
