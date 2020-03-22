const express = require("express");

const router = express.Router();

const {
    getPlace
} = require("../controllers/place")

router.get("/:id", getPlace)

module.exports = router;