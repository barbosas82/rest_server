var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    autoIncrement = require('mongoose-auto-increment'),
    config      = require('./config');

var db = mongoose.connect(config.mongoose.uri);

autoIncrement.initialize(db);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    res.send('Return JSON or HTML View');
});

//require('./models/auctions');
require('./models/artists');
require('./models/user');
require('./models/client');
require('./models/accesstoken');
require('./models/refreshtoken');
require('./routes')(app);

app.use(function(req, res) {
  return res.sendStatus(404);
});

app.set('port', process.env.PORT || 3001);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
