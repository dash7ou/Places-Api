const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

// get our routes
const placesRoute = require("./routes/place");
const userRoute = require("./routes/user");

// setup our app
const app = express();
app.use(bodyParser.json())

// static
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// cross
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 'Origin, X-Request-With, Content-Type, Accept, Authorization' );
    res.setHeader("Access-control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next()
});

// routes
app.use("/api/v1/places", placesRoute);
app.use("/api/v1/users", userRoute);


// routes not founds
app.use((req,res ,next)=>{
    const error = new HttpError("Could not found this route", 404);
    throw error;
})

// error handler
app.use((error, req, res, next)=>{
    if(req.file){
        fs.unlink(req.file.path, err =>{
            console.log(err);
        })
    }

    if(res.headerSent){
        return next(error)
    }

    res.status( error.code || 500 ).json({
        message: error.message || 'An unknown error occurred!'
    })
})

// conection database and run server
mongoose.connect("mongodb+srv://dashzou:mohammed12345***@place-api-z8gjz.mongodb.net/place-api?retryWrites=false&w=majority", {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connect to database port 27017")
    app.listen(5000, ()=>{
        console.log("server run successful.. port 5000")
    })
}).catch(err =>{
    console.log(err)
})
