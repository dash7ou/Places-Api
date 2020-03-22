const express = require("express");

const router = express.Router();

const {
    getPlaceById,
    getPlaceByUserId,
    createPlace,
    updatePalace,
    deletePlace
} = require("../controllers/place")

router.get("/:id", getPlaceById);
router.get("/user/:id", getPlaceByUserId);
router.post("/", createPlace);
router.patch("/:id", updatePalace);
router.delete("/:id", deletePlace);

module.exports = router;