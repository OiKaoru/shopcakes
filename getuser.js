var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//const port = 5000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CustomersDB');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
  console.log("connection succeeded");
});

app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(express.static(__dirname + '/images/'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/adduser', function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var password = req.body.password;

  var data = {
    "firstName": firstname,
    "lastName": lastname,
    "Email": email,
    "Password": password
  };

  db.collection('Users').insertOne(data, function(err, collection) {
    if (err) throw err;
    console.log("User signed up successfully!");
  });

  return res.redirect('buycakes.html');
});

app.use("/signup", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

//Routing Table
app.route('/index.html').get(function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.route('/buycakes.html').get(function(req, res) {
  res.sendFile(__dirname + "/buycakes.html");
});
app.route('/checkout.html').get(function(req, res) {
  res.sendFile(__dirname + "/checkout.html");
});
app.route('/signup.html').get(function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.route('/aboutus.html').get(function(req, res) {
  res.sendFile(__dirname + "/aboutus.html");
});

var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;
});
