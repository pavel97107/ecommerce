const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async function (req, res) {
  try {
    req.body.slug = slugify(req.body.title);
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: "Create product failed" });
  }
};
