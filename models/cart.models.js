const mongoose = require("mongoose");

const CartItem = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add product variant"],
    ref: "ProductVariant",
  },
  quantity: {
    type: Number,
    required: [true, "Quantity not provided"],
    min: [1, "Quantity must at least one"],
  },
});

const Cart = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  items: [CartItem],
  total: {
    type: Number,
    required: [true, "Total not provided"],
  },
});

const cart = mongoose.model("Cart", Cart);
module.exports = cart;
