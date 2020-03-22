const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyCOwRmPeaTFXyEdxokz3rgVbEgbv3hHabQ";

async function getCoordsForAddress( address ){
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    const { data } = response;
    if(!data || data.status === 'ZERO_RESULTS'){
        const errors = new HttpError("Could not found location for specified address.", 422)
        throw errors;
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
}


module.exports = getCoordsForAddress;