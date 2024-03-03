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
  console.log(req.body);
  if (!req.body.name || !req.body.description || !req.body.price) {
    res.status(400);
    throw new Error("Please enter a product");
  }
  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  res.status(201).json(product);
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
