const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymencreateCheckoutSession = asyncHandler(async (req, res) => {
  const { total, billingAddress, cartId } = req.body;
  const orderInfo = [billingAddress, cartId];
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
    success_url: `${process.env.FRONTEND_URL}/success/${orderInfo}`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
  });
  return res.status(200).json({ id: session.id });
});

const createOrder = asyncHandler(async (req, res) => {});

module.exports = { createPaymencreateCheckoutSession };
