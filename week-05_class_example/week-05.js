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
  // print names of the addresses, street address only + add NY
  $('td[style="border-bottom:1px solid #e3e3e3; width:260px"]').filter(function(i, elem) {
    item.address = $(elem).html().split('<br>')[2].trim() + " New York, NY";
    // // console.log(item)
    $('span').each(function(i, elem) {
      if ($(elem).attr('style') == "color:darkblue; font-size:10pt;") {
        item.wheelchair = $(elem).text().trim()
      }
    });
    // selecting the details box
    if ($('div').filter(function(i, elem) {
        if ($(elem).attr('class') == "detailsBox") {
          item.details = $(elem).text().trim()
        }

      }));
  });
  // print the wheelchair access


  //selecting meeting times + meeting type + special interest into their own objects
  $(elem).find('td').each(function(i, elem) {
    if ($(elem).attr('style') == 'border-bottom:1px solid #e3e3e3;width:350px;') {
      item.meetingArr = [];
      var timeArr = $(elem).html().trim().split('<br>');

      for (var i = 0; i < timeArr.length; i++) {
        if (timeArr[i].match(/ From/g) !== null) {
          var temp = {};
          temp.weekDay = timeArr[i].match(/Mondays|Tuesdays|Wednesdays|Thursdays|Fridays|Saturdays|Sundays/gi);
          temp.time = timeArr[i].match(/\d.+/gi);

          temp.type = timeArr[i + 1].slice(19, timeArr[i].length).trim();
          temp.special = null;
          if (timeArr[i + 2].match(/special/gi) !== null) {
            temp.special = timeArr[i + 2].slice(23, timeArr[i].length).trim();
          }

          item.meetingArr.push(temp);
          // console.log(item.meetingArr)
        }
      }
    }
    // console.log(item)
  });
  output.push(item)
});

console.log(JSON.stringify(output))
// fs.writeFileSync('aameetings.json',JSON.stringify(output),'utf8');
console.log(output.length)