// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('data/m09.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);
// console.log($('html'))

// print names of the addresses, street address only
// $('td').children().first().not('b').each(function(i, elem) {
$('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').each(function(i, elem) {
    
    console.log($(elem).html().split('<br>')[2].trim());
    // console.log('*****');
});



// // print project titles
// $('.project .title').each(function(i, elem) {
//     console.log($(elem).text());
// });



//$('#fruits').children('.pear').text()
// $('td').each(function(i, elem) 

//'http://visualizedata.github.io/datastructures/data/m09.html'