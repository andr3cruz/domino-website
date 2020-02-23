const PORT = 8139;

const http = require("http");
const url = require("url");
const fs = require("fs");
const crypto = require("crypto");
const mod = require('./modelos.js');

const headers = {
  "Content-Type": "application/javascript",
  "Cache-Control": "no-cache",
  "Access-Control-Allow-Origin": "*"
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  switch (req.method) {
    case "POST": {
      switch (pathname) {
        case "/ranking": {
          var fileArray = mod.createFile(fs);
          var fileArrayOrganize = mod.organize(fileArray);
          res.writeHead(200, headers);
          res.write(JSON.stringify(fileArrayOrganize));
          res.end();
          break;
        }
        case "/register": {
          var fileArray = mod.createFile(fs);
          let body = "";
          req.on("data", chunk => {
            body += chunk.toString();
          });
          req.on("end", () => {
            const info = JSON.parse(body);
            if(Object.keys(info).length!=2 || !info.hasOwnProperty("nick") || !info.hasOwnProperty("pass")){
              res.writeHead(400,headers);
              res.end();
              return;
            }

            for (var i = 0; i < fileArray.length; i++) {
              if (info.nick === fileArray[i].nick) {
                var decipher = crypto.createDecipher("aes128", "orangotango");
                var dec = decipher.update(fileArray[i].pass, "hex", "utf8");
                dec += decipher.final("utf8");
                if (info.pass !== dec) {
                  res.writeHead(401, headers);
                  res.end();
                } else {
                  res.writeHead(200, headers);
                  res.end();
                }
                return;
              }
            }
 
            var cipher = crypto.createCipher("aes128", "orangotango");
            var crypted = cipher.update(info.pass, "utf8", "hex");
            crypted += cipher.final("hex");
            fs.appendFile(
              "users.txt",
              info.nick + "," + crypted + ",0,0;",
              function(err) {
                if (err) throw err;
                console.log(info);
              }
            );
            res.writeHead(200, headers);
            res.end();
          });
          break;
        }
        default: {
          res.writeHead(404,headers);
          res.end();
          break;
        }
      }
      break;
    }
    default: {
      res.writeHead(500,headers);
      res.end();
    }
  }
});

server.listen(PORT);
