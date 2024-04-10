const mongoose = require("mongoose");

const OrderItem = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Must have product"],
    ref: "ProductVariant",
  },
  quantity: {
    type: Number,
    required: [true, "Please add quantity"],
    min: [1, "Quantity must at least one"],
  },
});

const Order = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add billing address"],
    ref: "BillingAddress",
  },
  items: [OrderItem],
  total: {
    type: Number,
    required: [true, "Total is mandatory"],
  },
  status: {
    type: String,
    required: [true],
  },
});

const order = mongoose.model("Order", Order);
module.exports = order;
