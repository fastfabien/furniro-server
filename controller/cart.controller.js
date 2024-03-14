const asyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const Cart = db.cart;

const getUserCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: "items.product",
        select: "images",
      })
      .exec();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400);
    throw new Error("The user cart is void.");
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    res.status(400);
    throw new Error("Please provide the required info.");
  }

  let cart = await Cart.findOne({ user: user_id });

  if (!cart) {
    cart = new Cart({
      user: user_id,
      items: [{ product: product_id, quantity: quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === product_id
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ product: product_id, quantity: quantity });
    }
  }

  try {
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const removeToCart = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;

  if (!product_id) {
    res.status(400);
    throw new Error("Please provide the product ID.");
  }

  let cart = await Cart.findOne({ user: user_id });

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found!");
  }

  const productItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === product_id
  );

  if (productItemIndex !== -1) {
    cart.items.splice(productItemIndex, 1);
  }

  if (cart.items.length === 0) {
    await Cart.deleteOne({ id: cart._id });
    res.status(400);
    throw new Error("Cart deleted because there is no items.");
  } else {
    try {
      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

module.exports = { addToCart, removeToCart, getUserCart };
