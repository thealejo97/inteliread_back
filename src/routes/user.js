const express = require('express');

const router = express.Router();

// create user
router.post('/users', (req,res) => {
    res.send("Create user");
})


module.exports = router;

