const express = require('express');
var port = process.env['port']
const app = express();
const { readFile } = require('fs').promises;
const fs = require('fs');
// welcome page
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

//let student = response.data
//let data = JSON.stringify(student);
//fs.writeFileSync('data.json', data);