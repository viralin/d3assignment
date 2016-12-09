//here i have merged the 3 files using append function and the final merge is kept in the secondfile itself.
// var fs = require('fs');

// function ReadAppend(file,appendFile){
  
//    fs.readFile(appendFile, function (err, data) {
//     if (err) throw err;
//     //console.log('File was read');

//     fs.appendFile(file, data, function (err) {
//       if (err) throw err;
//      // console.log('The "data to append" was appended to file!');

//     });
//   });
// }
// file = './SecondFile.csv';
// appendFile = './ThirdFile.csv';
// ReadAppend(file,appendFile);

// appendFile = './FourthFile.csv';
// ReadAppend(file,appendFile);


// fs.readFile('./SecondFile.csv');
//file is merged now.

var fs = require('fs');
var readline = require('readline');

//creating another aray for already merged file and reading it through readfilesync
var finaldata=fs.readFileSync('SecondFile.csv','utf8');
var rows = finaldata.split('\n');
var  Headerarray = rows[0].split(',');


var jsonheader = [];
var index = [];	//index of headers
var rows = [];  //rest of body/all data except headers
var educationarray = ['Educational level - Literate without educational level - Persons','Educational level - Below Primary - Persons','Educational level - Primary - Persons','Educational level - Middle - Persons','Educational level - Matric/Secondary - Persons','Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons','Educational level - Non-technical diploma or certificate not equal to degree - Persons','Educational level - Technical diploma or certificate not equal to degree - Persons','Educational level - Graduate & above - Persons','Educational level - Unclassified - Persons','Age-group','Total/ Rural/ Urban'];
var sum = 0;
var bodyarray = [];
var objEdu={};
var arrObj=[];

for(var i = 0;i <  Headerarray.length;i++){
  for (var j = 0; j < educationarray.length; j++) {
    if( Headerarray[i] == educationarray[j]){
      jsonheader.push( Headerarray[i]);
      index.push(i);
    }
  }
}

// console.log(index);


for(var j = 2;j < jsonheader.length;j++){
  for(var i = 1;i < rows.length;i++){
    bodyarray = rows[i].split(',');
    if((bodyarray[index[1]]=='All ages') && (bodyarray[index[0]]=='Total')) {
      if(!(isNaN(bodyarray[index[j]]))){
        sum=sum+parseInt(bodyarray[index[j]]);
      }
    }
  }

  objEdu[jsonheader[j]]=sum;
  if(!(arrObj.hasOwnProperty(jsonheader[j]))) {
    arrObj.push(objEdu);
    // console.log(objEdu);
    objEdu={};
  }
}

//console.log(arrObj);
var jsString=JSON.stringify(arrObj); // stringify the object
fs.writeFileSync('finaleducation.json',jsString);//using the writeFileSync to write to required json file