const { Router } = require("express");

const router = Router();

//controllers
const { createOrUpdateUser } = require("../controllers/auth");

router.get("/create-or-update-user", createOrUpdateUser);

module.exports = router;
