const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async function (req, res) {
  try {
    const { name } = req.body;
    const sub = new Sub({ name, slug: slugify(name) });
    await sub.save();
    res.json(sub);
  } catch (e) {
    res.status(400).json({ message: "Create sub failed" });
  }
};

exports.read = async function (req, res) {
  try {
    const sub = await Sub.findOne({ slug: req.params.slug });
    res.json(sub);
  } catch (e) {
    res.json({ message: e.message });
  }
};

exports.update = async function (req, res) {
  const { name } = req.body;
  try {
    const sub = await Sub.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(sub);
  } catch (e) {
    res.json({ message: e.message });
  }
};

exports.remove = async function (req, res) {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (e) {
    res.json({ message: e.message });
  }
};

exports.list = async function (req, res) {
  try {
    const subs = await Sub.find({}).sort({ createdAt: -1 });
    res.json(subs);
  } catch (e) {
    res.json({ message: e.message });
  }
};