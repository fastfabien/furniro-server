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
    sku_prefix: {
      type: Number,
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

Product.virtual("ProductVariant", {
  ref: "ProductVariant",
  localField: "_id",
  foreignField: "parent",
});

Product.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastProduct = await this.constructor.findOne(
      {},
      {},
      { sort: { sku_prefix: -1 } }
    );

    let zeroToAdd;

    if (this.sku > 10 < 100) {
      zeroToAdd = Math.max(0, 1);
    } else if (this.sku > 100) {
      zeroToAdd = Math.max(0, 0);
    } else {
      zeroToAdd = Math.max(0, 2);
    }

    if (lastProduct) {
      let new_product_sku = Number(lastProduct.sku_prefix + 1);
      this.sku = "0".repeat(zeroToAdd) + new_product_sku;
      this.sku_prefix = new_product_sku;
    } else {
      this.sku_prefix = 1;
      this.sku = "0".repeat(zeroToAdd) + 1;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const product = mongoose.model("Product", Product);

module.exports = product;
