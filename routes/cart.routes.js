const express = require("express");
const {
  addToCart,
  removeToCart,
  getUserCart,
} = require("../controller/cart.controller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addToCart);
router.post("/remove/:id", protect, removeToCart);
router.get("/", protect, getUserCart);

module.exports = router;
