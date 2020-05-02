var express = require('express');
var app = express();
var pm2 = require('pm2')

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/Restart', function (req, res) {
   const rest = pm2.restart(0, errback => {
	 console.log("El servidor fue reiniciado");
	})
  return res.send('el servidor fue reiniciado');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
