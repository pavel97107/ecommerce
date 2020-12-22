const { Router } = require("express");

const router = Router();

router.get('/auth/1', (req, res) => {
    res.json({message: 'hello world'})
})


module.exports = router;