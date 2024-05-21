const express = require('express');
const router = express.Router();
const {
     addTipsData, allTips, addReportData,
      addDoctersData, allDoctors ,addFeedbackData ,
      getFeedbackData ,createNotification,getActiveNotifications,
      adminTipCreation,adminDocCreation,getAllNotifications,getAllProblems,
      getUsers,getUsersCount,deleteUser,deleteTip,deleteDoctor,addUser,
      getUserProfile,updateUserProfile,uploadFile} = require("../Controller/Controller");


router.get("/addtips", addTipsData);
router.get("/gettips", allTips);
router.post("/reports", addReportData);
router.post("/adddoc", addDoctersData);
router.post("/addfeedback", addFeedbackData);
router.post("/addnotification", createNotification);
router.get("/getnotifications", getActiveNotifications);
router.get("/getallnotifications", getAllNotifications);
router.get("/getallproblems", getAllProblems);
router.get("/getfeedback", getFeedbackData);
router.get("/getdoc", allDoctors);
router.post("/adduser", addUser); 
router.post("/admintip", adminTipCreation);
router.post("/admindoccreate", adminDocCreation);
router.get("/getusers", getUsers);
router.get("/getuserscount", getUsersCount);
router.delete("/deleteuser", deleteUser);
router.delete("/deletetip", deleteTip);
router.delete("/deletedoctor", deleteDoctor);
router.get("/getprofile",getUserProfile)
router.put("/updateprofile",updateUserProfile)
router.post("/upload", uploadFile);


module.exports = router;
