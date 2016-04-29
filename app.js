var express = require('express');

var kurser = require('./routes/kurser');
var app = express();


var port = process.env.PORT || 3000;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/kurser', kurser.alla);
app.get('/kurser/:id', kurser.visa);
app.get('/db', kurser.skapa);

app.listen(port, function () {
  console.log('Example app listening on port ' + port + "!");
});