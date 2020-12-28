const User = require("../models/user");

exports.createOrUpdateUser = async function (req, res) {
  let { name, email, picture } = req.user;
  if (!name) {
    name = email.split("@")[0];
  }

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (!user) {
    const user = new User({ name, email, picture });
    await user.save();
    return res.json({ user });
  }
  res.json({ user });
};

exports.currentUser = async function (req, res) {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
