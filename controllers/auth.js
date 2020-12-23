const User = require("../models/user");

exports.createOrUpdateUser = async function (req, res) {
  console.log("MY USER", req.user);
  const { name, email, picture } = req.user;

  const currentUser = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (!currentUser) {
    const newUser = new User({ name, email, picture });
    await newUser.save();
    console.log("NEW USER", newUser);
    return res.json({ newUser });
  }
  console.log("CURRENT USER", currentUser);
  res.json({ currentUser });
};
