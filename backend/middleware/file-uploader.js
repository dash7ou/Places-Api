const multer = require("multer");
const uuid = require("uuid/v1");

const MIN_TYPE_MAP = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const fileUploader = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file , cb)=>{
            cb(null, "uploads/images")
        },
        filename: (req, file ,cb)=>{
            const ext = MIN_TYPE_MAP(file.mimetype);
            cb(null, uuid() + "." + ext);
        }
    })
});


module.exports = fileUploader