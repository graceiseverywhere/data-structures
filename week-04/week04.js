// npm install mongodb
var fs = require("fs");  // create variable for the fs module
var request = require('request'); // npm install request

var dbName = 'NYAAMeetings'; // name of Mongo database (created in the Mongo shell)
var collName = 'meetingdirectory'; // name of Mongo collection (created in the Mongo shell)

var addresses =JSON.parse(
       fs.readFileSync('./week-03/output.txt') // this is from the txt file from week03 assignment with the addresses and lat_long
   )

   // Connection URL
   var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

   // Retrieve
   var MongoClient = require('mongodb').MongoClient;

   MongoClient.connect(url, function(err, db) {
       if (err) {return console.dir(err);}

       var collection = db.collection(collName);

       // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
       collection.insert(addresses);
       db.close();

   }); //MongoClient.connect

// }); //request 