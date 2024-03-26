const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.product = require("./product.models");
db.user = require("./user.models");
db.productVariant = require("./productVariant.models");
db.cart = require("./cart.models");
db.billingAddress = require("./billingAddress.model");

module.exports = db;
