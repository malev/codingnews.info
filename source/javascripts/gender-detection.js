//= require "jquery"
//= require "vendor/csvToArray.v2.1"
//= require "vendor/underscore.js"
//= require "vendor/responsive-tables"

//= require "templates/gender-detection"


function printTable(tableData){
  var tableId = "table";
  var output = [];
  var goodBadUnknown = function(str1, str2){
    var output = "wrong"
    if(str1 == str2){
      output = "good";
    } else if (str2 == "unknown") { 
      output = "unknown";
    }
    return output;
  }
  output = _.map(tableData, function(row){
    var verifications = [
      goodBadUnknown(row[1], row[2]),
      goodBadUnknown(row[1], row[3]),
      goodBadUnknown(row[1], row[4]),
      goodBadUnknown(row[1], row[5])
    ]
    return row.concat(verifications);
  });

  $("#table").html(JST['templates/gender-detection']({tableData: output}));
}

$(function() {
  $.ajax({
    url: "/data/gender-detection.csv"
  }).done(function(data){
    var genderData = data.csvToArray();

    printTable(genderData)
  })
});
