const express = require("express");
const {
  addToCart,
  removeToCart,
  getUserCart,
  createCartAndReturnId,
} = require("../controller/cart.controller");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, addToCart);
router.post("/remove/:id", protect, removeToCart);
router.get("/", protect, getUserCart);
router.post("/new", createCartAndReturnId);

module.exports = router;
