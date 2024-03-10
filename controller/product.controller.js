const asyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const Product = db.product;

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const files = req.files;
  const { name, description, short_description, price, size, sku } = req.body;
  if (!req.body.name || !req.body.description || !req.body.price) {
    res.status(400);
    throw new Error("Please enter a product");
  }

  const new_product = new Product({
    name: name,
    description: description,
    short_description: short_description,
    price: price,
    size: size.split(","),
    sku: sku,
  });

  for (let i = 0; i < files.length; i++) {
    new_product.images.push(files[i].buffer);
  }

  try {
    const savedProduct = await new_product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
