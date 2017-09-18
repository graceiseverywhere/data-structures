var fs = require("fs");  // create variable for the fs module
var request = require('request'); // npm install request
var async = require('async'); // npm install async

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grecdp NEW_VAR
var apiKey = process.env.googlekey;
// process.env.GMAKEY;
console.log(apiKey)

var meetingsData = [];
var addresses =JSON.parse(
        fs.readFileSync('../week-02/output.json') // this is from the json file from week02 
    )

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    // console.log(apiRequest)
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    console.log(meetingsData);
    fs.writeFileSync('output.txt',JSON.stringify(meetingsData),'utf8');
    
});