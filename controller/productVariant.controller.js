const asyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const Product = db.product;
const Variant = db.productVariant;

const generateAllVariant = asyncHandler(async (req, res) => {
  const products = await Product.find();
  const variantToSaves = [];
  if (!products) {
    res.status(400);
    throw new Error("No product available");
  }

  products.map((product) => {
    product.size[0].map((variant) => {
      let name = product.name + " " + variant;
      const size = variant;
      const parent = product._id;
      const price = product.price;

      const new_variant = new Variant({
        name: name,
        size: size,
        parent: parent,
        price: price,
      });

      variantToSaves.push(new_variant);
    });
  });

  console.log(variantToSaves);

  try {
    const savedVariants = await Variant.insertMany(variantToSaves);
    res.status(201).json(savedVariants);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { generateAllVariant };
