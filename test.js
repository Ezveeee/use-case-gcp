const fs = require('fs');
const csv = fs.readFileSync('data.csv', 'utf8');

var lineArray = csv.toString().split("\r\n");
var line = [];

var result = [];

for(i = 0; i < lineArray.length-1; ++i){
    line = lineArray[i].toString().split("\t");
    var temp = {};

    result.push(temp);
    result[i]["id"] = line[0] + line[1] + line[2];
    result[i]["nom"] = line[16];
    result[i]["date_creation"] = line[6];
    result[i]["date_fermeture"] = line[7];
    result[i]["pays"] = line[5];
    result[i]["adresse"] = line[8];
    result[i]["code_postal"] = line[11];
    result[i]["ville"] = line[12];
}

const stringResult = JSON.stringify(result);
console.log(stringResult);