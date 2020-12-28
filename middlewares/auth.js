const admin = require("../firebase");
const User = require("../models/user");
exports.authCheck = async function (req, res, next) {
  console.log(req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
  } catch (e) {
    return res.status(401).json({
      message: "INVALID OR EXPIRED TOKEN",
    });
  }
  next();
};

exports.adminCheck = async function (req, res) {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    req.status(403).json({
      error: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
