const mongoose = require("mongoose");

const BillingAddress = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  first_name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  last_name: {
    type: String,
    required: [true, "Please enter first name"],
  },
  company_name: {
    type: String,
    required: false,
  },
  region: {
    type: String,
    required: [true, "Please enter region"],
  },
  street: {
    type: String,
    required: [true, "Please enter street address"],
  },
  city: {
    type: String,
    required: [true, "Please enter city"],
  },
  province: {
    type: String,
    required: [true, "Please enter province"],
  },
  zip_code: {
    type: Number,
    required: [true, "Please enter zip code"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter email address"],
  },
  additional_information: {
    type: String,
    required: false,
  },
});

const billingAddress = mongoose.model("BillingAddress", BillingAddress);
module.exports = billingAddress;
