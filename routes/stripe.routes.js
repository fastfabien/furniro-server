const express = require("express");
const {
  createPaymencreateCheckoutSession,
} = require("../controller/stripe.payement.controller");
const router = express.Router();

router.post("/", createPaymencreateCheckoutSession);

module.exports = router;
