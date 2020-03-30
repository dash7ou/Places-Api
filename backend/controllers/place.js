const fs = require("fs");

const { validationResult }= require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error")
const getCoordsForAddress = require("../utils/location");
const Place = require("../models/Place");
const User = require("../models/User");

exports.getPlaceById = async (req, res ,next)=>{
    const {
        params:{
            id: placeId
        }
    } = req;


    let place;
    try{
        place = await Place.findById(placeId);
    }catch(err){
        return next(new HttpError("There are error in getting place", 500))
    }
    if(!place) return next(new HttpError("There is no place with this id", 404));
    res.status(200).send(place);
}
exports.getPlaceByUserId = async (req, res, next)=>{
    const {
        params:{
            id: userId
        }
    } = req;

    let places;
    try {
        places = await Place.find({ creator : userId})
    } catch (error) {
        return next(new HttpError("There are error in getting places", 500))
    }
    
    if(!places || places.length === 0 ){
        return next(new HttpError("No Places", 404));
    }

    res.status(200).send(places);
}
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
            creator
        }
    } = req;
    let coordinates;
    try{
        coordinates = await getCoordsForAddress(address);
    }catch(err){
        return next(err)
    }

    let user;
    try{
        user = await User.findById(creator);
    }catch(err){
        const error = new HttpError("Error in creating new place please try again.", 500);
        return next(error);
    }
    const place = new Place({
        title,
        description,
        image: req.file.path,
        address,
        location: coordinates,
        creator
    });


    try{
        const session = await mongoose.startSession()
        session.startTransaction()
        await place.save({ session: session });
        user.places.push(place);
        await user.save({session: session});
        await session.commitTransaction();
    }catch(err){
        const error = new HttpError("Error in creating new place please try again.", 500);
        return next(error);
    }
    res.status(200).send(place)
}
exports.updatePalace = async (req ,res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError("Invalid inputs passedm please check your data", 422))
    }

    const {
        body:{
            title,
            description
        },
        params:{
            id: placeId
        }
    } = req;

    let place;
    try{
        place = await Place.findOne({
            _id: placeId
        });
    } catch(err){
        const error = new HttpError("Error in update place please try again.", 500);
        return next(error);
    }


    if(!place) return next(new HttpError("There is no place with this id", 404));

    place.title= title;
    place.description = description;

    try{
        await place.save();
    }catch(err){
        console.log(err)
        const error = new HttpError("Error in update place please try again.", 500);
        return next(error);
    }
    res.status(200).send(place)
}
exports.deletePlace = async (req, res, next)=>{
    const {
        params: {
            id: placeId
        }
    } = req;

    let place;
    try{
        place = await Place.findOne({ _id: placeId}).populate("creator");
    }catch(err){
        const error = new HttpError("Error in delete place please try again.", 500);
        return next(error);
    }

    if(!place) return next(new HttpError("There is no place with this id", 404));

    const imagePath = place.image;
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await place.remove({session});
        place.creator.places.pull(place);
        await place.creator.save({session});
        await session.commitTransaction();
    }catch(err){
        const error = new HttpError("Error in delete place please try again.", 500);
        return next(error);
    }

    fs.unlink(imagePath, err=>{
        console.log(err);
    });

    res.status(200).send({
        message: "Deleted post done."
    })
}