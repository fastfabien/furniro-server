const asyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const Cart = db.cart;
const Variant = db.productVariant;

const getUserCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate({
        path: "items.product",
        select: "_id couverture name price",
      })
      .exec();

    res.status(200).json(cart);
  } catch (err) {
    res.status(400);
    throw new Error("The user cart is void.");
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const user_id = req.user?.id;
  let { product_id, size, quantity } = req.body;

  if (!product_id || !quantity || !size) {
    return res
      .status(400)
      .json({ message: "Please provide product_id, size, and quantity." });
  }

  const variant = await Variant.findOne({ parent: product_id, size: size });
  if (!variant) {
    return res.status(400).json({ message: "Product variant not found." });
  }

  let cart = await Cart.findOne({ user: user_id });
  if (!cart) {
    cart = new Cart({
      user: user_id,
      items: [{ product: variant._id, quantity: quantity }],
      total: variant.price * Number(quantity),
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === variant._id.toString()
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
      cart.total += variant.price * Number(quantity);
    } else {
      cart.items.push({ product: variant._id, quantity: quantity });
      cart.total += variant.price * Number(quantity);
    }
  }

  try {
    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate({
      path: "items.product",
      select: "couverture name price _id",
    });
    res.status(200).json(populatedCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      const populatedCart = await Cart.findById(cart._id).populate({
        path: "items.product",
        select: "couverture name price _id",
      });
      res.status(200).json(populatedCart);
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
});

const createCartAndReturnId = asyncHandler(async (req, res) => {
  const { items, total } = req.body;
  let itemsArray = [];

  let newCart = new Cart({
    total: total,
  });

  await Promise.all(
    items.map(async (item, index) => {
      let variant = await Variant.findOne({ name: item.product.name });
      if (!variant) {
        res.status(400);
        throw new Error("Product variant not found!");
      }

      let cartItem = {
        product: variant._id,
        quantity: item.quantity,
      };

      itemsArray.push(cartItem);
    })
  );

  newCart.items = itemsArray;

  await newCart.save();
  return res.status(201).json(newCart._id);
});

module.exports = {
  addToCart,
  removeToCart,
  getUserCart,
  createCartAndReturnId,
};
