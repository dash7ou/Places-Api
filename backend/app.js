const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use("/api/v1/places");

app.use((error, req, res, next)=>{
    if(!res.headerSent){
        return next(error)
    }

    res.status(error.code || 500);
    res.send({
        message: error.message || 'An unknown error occurred!'
    })
})

app.listen(5000, ()=>{
    console.log("server run successful.. port 5000")
})