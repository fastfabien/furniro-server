const asyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const Cart = db.cart;
const Order = db.order;
const Address = db.billingAddress;

const createOrder = asyncHandler(async (req, res) => {
  const { cartId, billingAddress } = req.body;
  const cart = await Cart.findOne({ _id: cartId });
  let order;

  if (!cart) {
    res.status(400);
    throw new Error("Cart not found!");
  }

  const address = await Address.findOne({ _id: billingAddress });

  if (!address) {
    res.status(400);
    throw new Error("Cart not found!");
  }

  if (cart.user) {
    order = new Order({
      user: cart.user._id,
      address: address._id,
      items: cart.items,
      total: cart.total,
      status: "payed",
    });
  } else {
    order = new Order({
      address: address._id,
      items: cart.items,
      total: cart.total,
      status: "payed",
    });
  }

  await order.save();
  await Cart.deleteOne({ _id: cart._id });
  res.status(200).json(cart);
});

module.exports = { createOrder };
