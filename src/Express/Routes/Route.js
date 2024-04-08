const express = require('express');
const router = express.Router();
const { addTipsData, allTips, addReportData, addDoctersData, allDoctors ,addFeedbackData ,getFeedbackData} = require("../Controller/Controller");

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get("/addtips", addTipsData);
router.get("/gettips", allTips);
router.post("/reports", addReportData);
router.get("/adddoc", addDoctersData);
router.post("/addfeedback", addFeedbackData);
router.get("/getfeedback", getFeedbackData);
router.get("/getdoc", allDoctors);



module.exports = router;
