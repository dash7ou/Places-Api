const express = require("express");
const { check } = require("express-validator");

const fileUploader = require("../middleware/file-uploader");
const checkAuth = require("../middleware/check-auth");


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

router.use(checkAuth);

router.post("/",  
fileUploader.single("image"),
[
    check("title").not().isEmpty(),
    check("description").isLength({min : 5}),
    check("address").not().isEmpty()
] ,createPlace);

router.patch("/:id",[
    check("title").not().isEmpty(),
    check("description").isLength({min : 5}),
], updatePalace);

router.delete("/:id", deletePlace);

module.exports = router;