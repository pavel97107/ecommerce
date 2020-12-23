const admin = require("../firebase");

exports.authCheck = async function (req, res, next) {
  console.log(req.headers);
  try {
    const firebaseUser = await admin
    .auth()
    .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    console.log('TOKEN IS VERIFY', firebaseUser)
  } catch (e) {
    res.status(401).json({
      message: "INVALID OR EXPIRED TOKEN"
    })
  }
  next();
};
