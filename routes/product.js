const { Router } = require("express");
const router = Router();
//controllers
const { create } = require("../controllers/product");
//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/product", authCheck, adminCheck, create);


module.exports = router;
