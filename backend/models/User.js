const mongoose = require("mongoose");

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


module.exports = mongoose.model("User", userSchema);