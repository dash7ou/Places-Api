const HttpError = require("../models/http-error");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            throw new Error("Authorization Falid!")
        }

        const decodedToken = jwt.verify(token, "jdakdfjkajhdksajhfkjahk");
        const user = await User.findById(decodedToken.id)
        if(!user) throw new Error("Authorization Falid!")

        req.userData = user;
        next()
    }catch(err){
        const error = new HttpError("Authorization Falid!", 401)
        return next(error);
    }
}