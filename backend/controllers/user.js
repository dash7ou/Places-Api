const HttpError = require("../models/http-error");
const { validationResult }= require("express-validator");

const User = require("../models/User");


exports.getUsers =async (req, res, next)=>{
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return next(new HttpError("There are problem in get users try again", 500))
    }

    if(!users || users.length === 0) return next(new HttpError("There is no users until now.", 404));

    res.status(200).send(users);
}
exports.signup = async (req , res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError("Invalid inputs passed please check your data", 422))
    }

    const {
        body:{
            name,
            email,
            password,
        }
    } = req;


    let userExist;
    try {
        userExist = await User.findOne({email})
    } catch (error) {
        console.log(error)
        return next(new HttpError("There are problem in signup try again", 500))
    }

    if(userExist){
        const error = new HttpError("This user already exist", 422);
        return next(error);
    }
    let user;
    let token;

    try{
        user = new User({name, email, password , image:req.file.path, places:[]});
        await user.save();
        token = user.getSignedJwtToken();
    }catch(err){
        console.log(err)
        return next(new HttpError("There are problem in signup try again", 500))
    }

    res.status(201).send({userId: user._id.toString(), email: user.email, token})
}
exports.login = async (req , res , next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError("Invalid inputs passedm please check your data", 422))
    }

    const {
        body:{
            email,
            password
        }
    } = req;

    let user;
    try {
        user = await User.findOne({
            email
        });
    } catch (error) {
        return next(new HttpError("There are problem in login try again", 500))
    }

    if(!user) return next(new HttpError("Invalid email or password", 401));

    const passwordIsMatch = await user.matchPassword(password);
    if(!passwordIsMatch) return next(new HttpError("Invalid email or password", 401));

    let token;
    try{
        token = user.getSignedJwtToken();
    }catch(err){
        return next(new HttpError("There are problem in login try again", 500))
    }


    res.status(200).send({userId: user._id.toString(), email: user.email, token});
}