const HttpError = require("../models/http-error");
const { validationResult }= require("express-validator")


exports.getUsers = (req, res, next)=>{}
exports.signup = (req , res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid inputs passedm please check your data", 422)
    }
}
exports.login = (req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid inputs passedm please check your data", 422)
    }
}