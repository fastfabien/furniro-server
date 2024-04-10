const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config();

const createPaymencreateCheckoutSession = asyncHandler(async (req, res) => {
  const { total, billingAddress, cartId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "MUR",
          product_data: {
            name: "Furniro shop",
          },
          unit_amount: Number(total),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success?id=${cartId}&address=${billingAddress}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });
  return res.status(200).json({ id: session.id });
});

const createOrder = asyncHandler(async (req, res) => {});

module.exports = { createPaymencreateCheckoutSession };
