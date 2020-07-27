const fs = require('fs');
const http = require('http');
const readline = require('readline');

var arquivo = fs.readFileSync('./input-dump');

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input-dump')
  });

  var jsonArquivo;
  lineReader.on('line', function (line) {
      var teste = JSON.parse(line).image;
      var testesegundo = http.get(JSON.parse(line).image, function(res) {
          if(res.statusCode == 200) {
              console.log(line)

          }
        });
  });


