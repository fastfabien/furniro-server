const express = require("express");
const {
  generateAllVariant,
  getAllVariant,
  getProductVariantCouverture,
} = require("../controller/productVariant.controller");
const router = express.Router();

router.post("/", generateAllVariant);
router.get("/", getAllVariant);
router.get("/:name", getProductVariantCouverture);

module.exports = router;
