const express = require("express");
const {
  generateAllVariant,
} = require("../controller/productVariant.controller");
const router = express.Router();

router.post("/", generateAllVariant);

module.exports = router;
