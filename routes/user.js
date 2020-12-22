const { Router } = require("express");

const router = Router();

router.get('/user/me', (req, res) => {
    res.json({message: 'Me'})
})


module.exports = router;