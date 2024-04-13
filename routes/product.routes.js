const express = require("express");
const router = express.Router();
const uploadFilesMiddleware = require("../middleware/uploadMiddleware");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addCoverPicture,
} = require("../controller/product.controller");
const multer = require("multer");
const upload = multer({ dest: "./my-uploads/" });

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", uploadFilesMiddleware.array("images", 20), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.post("/couverture", addCoverPicture);

module.exports = router;
