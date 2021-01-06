const { Router } = require("express");
const router = Router();
//controllers
const { create, read } = require("../controllers/product");
//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/product", authCheck, adminCheck, create);
router.get("/products", read);

module.exports = router;
