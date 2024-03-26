const asyncHandler = require("express-async-handler");
const db = require("../models/index.js");
const BillingAddress = db.billingAddress;
const User = db.user;

const createBillingAddress = asyncHandler(async (req, res) => {
  const {
    user_id,
    first_name,
    last_name,
    company_name,
    region,
    street,
    city,
    province,
    zip_code,
    phone,
    email,
    additional_information,
  } = req.body;
  const billingAddress = new BillingAddress({
    first_name,
    last_name,
    company_name,
    region,
    street,
    city,
    province,
    zip_code,
    phone,
    email,
    additional_information,
  });

  const user = await User.findOne({ _id: user_id });
  if (user) {
    billingAddress.user = user._id;
  }

  try {
    await billingAddress.save();
    res.status(201).json(billingAddress);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const getUserBillingAddress = asyncHandler(async (req, res) => {
  const user = req.user?.id;
  const userBillingAddress = await User.findOne({ _id: user }).populate(
    "billingAddress"
  );

  if (!userBillingAddress) {
    res.status(400);
    throw new Error(err.message);
  }

  return res.status(200).json(userBillingAddress.billingAddress);
});

const deleteUserBillingAddress = asyncHandler(async (req, res) => {
  const user = req.user?.id;
  const id = req.params.id;
  try {
    const deletedUserBillingAddress = await BillingAddress.deleteOne({
      _id: id,
    });
    return res.status(200).json(deletedUserBillingAddress);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = {
  createBillingAddress,
  getUserBillingAddress,
  deleteUserBillingAddress,
};
