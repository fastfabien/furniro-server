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

  for (const product of products) {
    for (const variant of product.size[0]) {
      let name = product.name + " " + variant;
      const size = variant;
      const parent = product._id;
      const price = product.price;
      const image = product.images[0];

      const variantAlreadyExist = await Variant.findOne({ name: name });

      if (!variantAlreadyExist) {
        const new_variant = new Variant({
          name: name,
          size: size,
          parent: parent,
          price: price,
          couverture: image,
        });
        variantToSaves.push(new_variant);
      }
    }
  }

  if (!variantToSaves.length) {
    return res.status(200).json({ message: "No new variants to save" });
  }

  try {
    const savedVariants = await Variant.insertMany(variantToSaves);
    res.status(201).json(savedVariants);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const getAllVariant = asyncHandler(async (req, res) => {
  const productVariants = await Variant.find();
  if (!productVariants) {
    res.status(400);
    throw new Error("There is no product variant");
  }

  res.status(200).json(productVariants);
});

const getProductVariantCouverture = asyncHandler(async (req, res) => {
  const variant = await Variant.findOne({
    name: req.params.name.toLocaleLowerCase(),
  });

  if (!variant) {
    res.status(400);
    throw new Error("Variant not found!");
  }

  res.status(200).json(variant.couverture);
});

module.exports = {
  generateAllVariant,
  getAllVariant,
  getProductVariantCouverture,
};
