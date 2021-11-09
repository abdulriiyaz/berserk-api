//import express
const express = require("express");
const router = express.Router();

router.get("/", handleAPIRequest);

function handleAPIRequest(req, res, next) {
    res.json({ character: req.body.character });
}

module.exports = router;
