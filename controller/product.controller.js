const asyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const Product = db.product;

const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page demandée, par défaut à la page 1
  const limit = parseInt(req.query.limit) || 8; // Nombre d'éléments par page, par défaut à 10

  const startIndex = (page - 1) * limit; // Index de départ pour la pagination
  const endIndex = page * limit; // Index de fin pour la pagination

  const totalProducts = await Product.countDocuments(); // Total des produits dans la base de données
  const totalPages = Math.ceil(totalProducts / limit); // Nombre total de pages pour la pagination

  const products = await Product.find().skip(startIndex).limit(limit);
  const simplifiedProduct = products.map((product) => ({
    image: product.images[0],
    name: product.name,
    price: product.price,
    id: product._id,
  }));

  // Obtenir les informations de pagination
  const pagination = {};
  if (endIndex < totalProducts) {
    pagination.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  res.status(200).json({
    pagination: {
      totalPages: totalPages,
      ...pagination,
    },
    simplifiedProduct,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

const createProduct = asyncHandler(async (req, res) => {
  const files = req.files;
  const { name, description, short_description, price, size } = req.body;
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
