const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const HttpError = require("../models/http-error")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image:{
        type: String,
        required: true
    },
    places:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Place"
        }
    ]
},{
    timestamps: true
});


// hashing password when signup
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }

    const {
        password
    } = this;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(password , salt);
    next();
})


module.exports = mongoose.model("User", userSchema);