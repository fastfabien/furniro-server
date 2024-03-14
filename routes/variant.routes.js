const express = require("express");
const {
  generateAllVariant,
  getAllVariant,
} = require("../controller/productVariant.controller");
const router = express.Router();

router.post("/", generateAllVariant);
router.get("/", getAllVariant);

module.exports = router;
