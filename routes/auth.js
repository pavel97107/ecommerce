const { Router } = require("express");
const router = Router();
//controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");
//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/create-or-update-user", [authCheck, createOrUpdateUser]);
router.post("/current-user", [authCheck, currentUser]);
router.post("/current-admin", [authCheck, adminCheck, currentUser]);
module.exports = router;
