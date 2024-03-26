const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const {
  createBillingAddress,
  getUserBillingAddress,
  deleteUserBillingAddress,
} = require("../controller/billingAddress.controller");
const router = express.Router();

router.post("/", createBillingAddress);
router.get("/", protect, getUserBillingAddress);
router.post("/remove/:id", protect, deleteUserBillingAddress);

module.exports = router;
