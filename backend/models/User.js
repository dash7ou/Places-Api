const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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

// matching password
userSchema.methods.matchPassword = async function (enterPassword) {
    return bcrypt.compare(enterPassword, this.password)
}


// Get JWT
userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({ id: this._id.toString()}, "jdakdfjkajhdksajhfkjahk", {expiresIn: '2h'});

}

module.exports = mongoose.model("User", userSchema);