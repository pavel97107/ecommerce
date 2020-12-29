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

exports.read = async function (req, res) {};

exports.update = async function (req, res) {};

exports.remove = async function (req, res) {};

exports.list = async function (req, res) {};
