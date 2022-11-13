const express = require('express');
var port = process.env['port']
const app = express();
const { readFile } = require('fs').promises;
const fs = require('fs');
const data = require("./data.json");
// welcome page
function errcheck(req,res){
  if (err) {
    res.status(500).send('<h1>Error! Code 500 server error go home or reload')
  }
}
app.get('/', async (request, response) => {
    response.send( await readFile('./index.html', 'utf8') );
});
app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});
// welcome page
app.listen(port, () => {
  console.log('server started on port', port);
});
app.get('/morework', async (request, response) => {

    response.send( await readFile('./morework/index.html', 'utf8') );
});
app.get('*', function(req, res){
   res.status(404).send('<h1>Error 404 go home</h1>');
});