// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;

  console.log("Database connection ready");
  console.log("DB: " + process.env.MONGODB_URI);
});

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'No work to show' });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Insert work on port ' + port);