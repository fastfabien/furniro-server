const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

User.virtual("Cart", {
  ref: "Cart",
  localField: "_id",
  foreignField: "user",
});

User.virtual("Order", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

User.virtual("billingAddress", {
  ref: "BillingAddress",
  localField: "_id",
  foreignField: "user",
});

const user = mongoose.model("User", User);

module.exports = user;
