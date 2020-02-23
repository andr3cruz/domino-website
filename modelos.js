module.exports.createFile = function(fs) {
    var fileArray = new Array();
    var dados = fs.readFileSync("users.txt", "utf8");
    var count = 0;
    var aux1 = "";
    var aux2 = "";
    var aux3 = "";
    var aux4 = "";
    for (var i = 0; i < dados.length; i++) {
        switch (count) {
        case 0: {
            aux1 = aux1.concat(dados[i]);
            if (dados[i + 1] == ",") {
            count++;
            i++;
            }
            break;
        }
        case 1: {
            aux2 = aux2.concat(dados[i]);
            if (dados[i + 1] == ",") {
            count++;
            i++;
            }
            break;
        }
        case 2: {
            aux3 = aux3 + dados[i];
            if (dados[i + 1] == ",") {
            count++;
            i++;
            }
            break;
        }
        default: {
            aux4 = aux4 + dados[i];
            if (dados[i + 1] == ";") {
            var ranking = {
                nick: aux1,
                pass: aux2,
                victories: parseInt(aux3, 10),
                games: parseInt(aux4, 10)
            };
            aux1 = "";
            aux2 = "";
            aux3 = "";
            aux4 = "";
            fileArray.push(ranking);
            i++;
            count = 0;
            }
            break;
        }
        }
    }
    return fileArray;
}

module.exports.organize = function(fileArray) {
  var ranking = new Array();
  for (var i = 0; i < fileArray.length; i++) {
    for (var j = i + 1; j < fileArray.length; j++) {
      if (fileArray[i].victories < fileArray[j].victories) {
        var temp = fileArray[i];
        fileArray[i] = fileArray[j];
        fileArray[j] = temp;
      }
    }
  }
  var j = 9;
  for (var i = 0; i < 10 && i < fileArray.length; i++) {
    ranking[i] = fileArray[j];
    j--;
  }
  delete ranking.pass;
  return ranking;
}