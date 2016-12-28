// Get the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config()
var Schema = mongoose.Schema;

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbURI = process.env.MONGODB_URI;
console.log(mongodbURI);

// Connect to the beerlocker MongoDB
mongoose.connect(mongodbURI, options);

var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
var User = mongoose.model('User', new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    created_at: Date,
    updated_at: Date
}));


var new_user = new User({
    name: 'test2',
    username: 'test2',
    password: 'test2'
});


conn.once('open', function() {
  // Wait for the database connection to establish, then start the app.  

  console.log('started')
    new_user.save(function(err) {
        if (err) throw err;
        console.log('User created!');
    });

  console.log("connected to the db...");                       
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