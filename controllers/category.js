const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async function (req, res) {
  try {
    const { name } = req.body;
    const category = new Category({ name, slug: slugify(name) });
    await category.save();
    res.json(category);
  } catch (e) {
    res.status(400).json({ message: "Create category failed" });
  }
};

exports.read = async function (req, res) {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (e) {
    res.json({ message: e.message });
  }
};

exports.update = async function (req, res) {
  const { name } = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(category);
  } catch (e) {
    res.json({ message: e.message });
  }
};

exports.remove = async function (req, res) {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (e) {
    res.json({ message: e.message });
  }
};

exports.list = async function (req, res) {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
  } catch (e) {
    res.json({ message: e.message });
  }
};
