const { validationResult }= require("express-validator");

const HttpError = require("../models/http-error")
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/Place");

exports.getPlaceById = (req, res ,next)=>{}
exports.getPlaceByUserId = (req, res, next)=>{}
exports.createPlace = async ( req , res , next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError("Invalid inputs passedm please check your data", 422));
    }
    const { 
        body:{
            address,
            title,
            description,
            image,
            creator
        }
    } = req;
    console.log("this is good place", address)
    let coordinates;
    try{
        coordinates = await getCoordsForAddress(address);
    }catch(err){
        return next(err)
    }

    const place = new Place({
        title,
        description,
        image,
        address,
        location: coordinates,
        creator
    })

    res.status(200).send(place)

}
exports.updatePalace = (req ,res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError("Invalid inputs passedm please check your data", 422)
    }
}
exports.deletePlace = (req, res, next)=>{}