const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async function (req, res) {
  req.body.slug = slugify(req.body.title);
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.read = async function (req, res) {
  const products = await Product.find({});
  res.json(products);
};
