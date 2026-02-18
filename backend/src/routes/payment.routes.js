const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");

router.post("/paypal/create", paymentController.createPaypalOrder);
router.post("/paypal/capture", paymentController.capturePaypalOrder);

module.exports = router;