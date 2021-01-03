const { Router } = require("express");
const router = Router();
//controllers
const { create, read, update, remove, list } = require("../controllers/sub");
//middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/sub", authCheck, adminCheck, create);
router.get("/subs", list);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);

module.exports = router;
