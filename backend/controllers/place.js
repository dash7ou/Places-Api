const HttpError = require("../models/http-error")
const { validationResult }= require("express-validator")

exports.getPlaceById = (req, res ,next)=>{}
exports.getPlaceByUserId = (req, res, next)=>{}
exports.createPlace = ( req , res , next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid inputs passedm please check your data", 422)
    }
}
exports.updatePalace = (req ,res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid inputs passedm please check your data", 422)
    }
}
exports.deletePlace = (req, res, next)=>{}