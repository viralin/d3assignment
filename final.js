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


var fs = require('fs');
var readline = require('readline');

 //creating another aray for already merged file and reading it through readfilesync
 var finaldata=fs.readFileSync('SecondFile.csv','utf8');
 //declaration
 var rows = [];
 var rows = finaldata.split('\n');
 var Headerarray = rows[0].split(',');
 var sum = 0;
 //all headers required by us in json
 var jsonheader = [];
 //index of required headers
 var index = [];	
 var bodyarray = [];
 var arrAgeGroup = [];
 var fullbody = []; 
 var ageObj={};
 var arrObj=[];

  for(var i = 0;i < Headerarray.length;i++){
  //Here we are taking only those headers which are to be added at the end that is literate persons and total,rural and urbans
  if(Headerarray[i] =='Literate - Persons' || Headerarray[i] =='Age-group' || Headerarray[i] =='Total/ Rural/ Urban'){

    //after fetching headers push it to another array.
    jsonheader.push(Headerarray[i]);
    index.push(i);
        }
   }

  for (var i = 1; i < rows.length-1; i++) {
  bodyarray = rows[i].split(',');
  //consol.log("inside for");
  //to remove the all-ages and age-groups
  if((arrAgeGroup.indexOf(bodyarray[index[1]]) < 0) && (bodyarray[index[1]] !== 'All ages') && (bodyarray[index[1]] !== 'Age-group')) {
    
      arrAgeGroup.push(bodyarray[index[1]]);
    
       }
   }
      //console.log(bodyarray[index[1]]);
     // console.log(arrAgeGroup);
    // console.log(jsonheader);
   //console.log(index);

 
  //full data of body
  for (var k = 0; k < arrAgeGroup.length; k++) {
     for(var i = 1;i < rows.length;i++){
      fullbody = rows[i].split(',');
       for(var j = 0;j < jsonheader.length;j++) {
       if(fullbody[index[j+1]] == arrAgeGroup[k] && fullbody[index[j]] == 'Total'){
           //console.log("inside if");
           //console.log(fullbody[index[j+1]]);
           //console.log(index[j]);
          sum = sum+parseInt(fullbody[index[j+2]]);
         // console.log(sum);

          ageObj['Age-group']=arrAgeGroup[k];
        }
             }
    }
    ageObj['Literate - Persons']=sum;
    arrObj.push(ageObj);
    ageObj={};
    sum=0;
  }
 console.log(arrObj);
//console.log(fullbody);
var jsString=JSON.stringify(arrObj);
fs.writeFileSync('final12.json',jsString);