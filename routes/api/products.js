const express = require("express");
const products = require("../../data/products");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: products,
    },
  });
});

module.exports = router;
