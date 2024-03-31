const express = require('express');
const router = express.Router();
const { addTipsData, allTips, addReportData, addDoctersData, allDoctors } = require("../Controller/Controller");

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get("/addtips", addTipsData);
router.get("/gettips", allTips);
router.post("/reports", addReportData);
router.post("/adddoc", addDoctersData);
router.get("/getdoc", allDoctors);

// router.post("/create-setup-intent", async function (request, response) {
//     const customer = await stripe.customers.create();
//     const ephemeralKey = await stripe.ephemeralKeys.create(
//         { customer: customer.id },
//         { apiVersion: '2022-08-01' }
//     );
//     const setupIntent = await stripe.setupIntents.create({
//         customer: customer.id,
//     });
//     response.json({
//         setupIntent: setupIntent.client_secret,
//         ephemeralKey: ephemeralKey.secret,
//         customer: customer.id
//     });
// });

// router.post("/", async function (request, response) {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: "100",
//         currency: "usd",
//         payment_method_types: ["PKR"],
//     });
//     response.json(paymentIntent);
// });

module.exports = router;
