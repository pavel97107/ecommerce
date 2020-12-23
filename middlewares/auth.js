const admin = require("../firebase");

exports.authCheck = function (req, res, next) {
  console.log(req.headers);
  const token = req.headers["x-auth-token"];

  if (!token) return res.status(400).json({ message: "No auth token" });

  const verifed = jwt.verifed(token, secretKey);

  if (!verifed) return res.status(400).json({ message: "Invalid token" });

  req.user = verifed;
  next();
};
