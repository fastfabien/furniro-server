const mongoose = require("mongoose");

const ProductVariant = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add variant name"],
  },
  size: {
    type: String,
    required: [true, "Please add variant size"],
  },
  colors: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "Please add variant price"],
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add Parent product"],
    ref: "Product",
  },
});

ProductVariant.virtual("CartItem", {
  ref: "CartItem",
  localField: "_id",
  foreignField: "product",
});

const productVariant = mongoose.model("ProductVariant", ProductVariant);

module.exports = productVariant;
