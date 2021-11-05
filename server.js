const express = require('express');
const path = require('path');

const app = express();



// Serve static files
app.use(express.static(__dirname + '/dist/my_first_ionic_app'));
console.log('THIS IS A PATH: ',__dirname)
// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/my_first_ionic_app/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 8080);
