const mongoose = require("mongoose");

const Product = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add product name"],
    },
    description: {
      type: String,
      required: [true, "Please add description"],
    },
    short_description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: [true, "Please add product price"],
    },
    size: [{ type: [String], enum: ["M", "L", "XL", "XXL"], required: true }],
    color: {
      type: String,
      required: false,
    },
    sku: {
      type: String,
      required: false,
    },
    images: [
      {
        data: Buffer,
        type: Buffer,
        required: false,
      },
    ],
    image_couverture: {
      type: Buffer,
      required: false,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", Product);

module.exports = product;
