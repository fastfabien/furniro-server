const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.product = require("./product.models");
db.user = require("./user.models");
db.productVariant = require("./productVariant.models");

module.exports = db;
