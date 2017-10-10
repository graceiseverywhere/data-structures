// npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('../week-01/data/m09.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);
// console.log($('html'))
var output = [];

// select the table row of each address
$('tbody tr[style = "margin-bottom:10px"]').each(function(i, elem) {
    var item = {};
    item.address = $(elem).html().split('<br>')[2].trim() + " New York, NY";
    item.handicapped = $(elem).find
    item.details = $(elem).find('.detailsBox').text().trim(); //printing the details box
    console.log(item)
});

// console.log(JSON.stringify(output))
// fs.writeFileSync('aameetings.json',JSON.stringify(output),'utf8');
// console.log(output.length)