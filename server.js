const express = require('express');
const app = express();
const fs = require("fs");
const path = require("path");
const csv_name = "test.csv";
const csv_path = path.join(__dirname, "csv", csv_name);
const csv = fs.readFileSync(csv_path, "utf-8");
const rows = csv.split("\r\n");
const html1=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>문장</title>
</head>
<body>
  <div style="font-size:50pt">
`;
const html2 = `
</div>
</body>
</html>
`;
var sendmsg="";
var n = 1;
var Flag = false;

var port = process.env.PORT || 8080;
var HOST = 'localhost';

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req,res) {
  res.sendFile(__dirname + "/public/main.html")
})

app.get('/see', function(req,res) {
  sendmsg=rows[n].split(",");
  sendmsg=sendmsg[1];
  res.send(html1+sendmsg+html2);
})

app.get('/yes', function(req,res) {
  Flag = true;

  changeflag=(rows[n].split(","));
  changeflag[2] = Flag;

  changeflag=changeflag[1]+","+changeflag[2]+"\n";

  fs.writeFile('./res/test.txt', changeflag, { flag: 'a+' }, err => {
    if (err) {
      console.error(err)
      return
    }
  })



  n = n + 1;
})

app.get('/no', function(req,res) {
  Flag = false;

  changeflag=(rows[n].split(","));
  changeflag[2] = Flag;

  changeflag=changeflag[1]+","+changeflag[2]+"\n";

  fs.writeFile('./res/test.txt', changeflag, { flag: 'a+' }, err => {
    if (err) {
      console.error(err)
      return
    }
  })


  n = n + 1;
})

app.listen(port,function(){
  console.log(`Live on port: http://${HOST}:${port}`);
});