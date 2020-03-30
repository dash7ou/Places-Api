const express = require("express");
const { check } = require("express-validator");

const fileUploader = require("../middleware/file-uploader");

const router = express.Router();

const {
    getUsers,
    signup,
    login
} = require("../controllers/user");


router.get("/", getUsers);
router.post("/signup",
    fileUploader.single("image"),
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min : 6 })
    ]
, signup);
router.post("/login",[
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min : 6 })
], login);

module.exports = router;