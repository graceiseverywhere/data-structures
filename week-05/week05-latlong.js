var fs = require("fs");  // create variable for the fs module
var request = require('request'); // npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
var apiKey = process.env.googlekey;

var address =JSON.parse(
        fs.readFileSync('../week-05/aameetingsclean.json') // this is from the json file made from the new complete set 
    )

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(address, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        if(JSON.parse(body).status !== "ZERO_RESULTS"){
            value.latLong = JSON.parse(body).results[0].geometry.location;   
        }
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('parsed-latlong.json',JSON.stringify(address),'utf8');
    
});