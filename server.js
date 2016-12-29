// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// load modules required
var articleController = require('./controllers/article');

// load environment variables
require('dotenv').config()

// set db connection settings
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbURI = process.env.MONGODB_URI;
console.log(mongodbURI);

// Connect to the beerlocker MongoDB
mongoose.connect(mongodbURI, options);

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

// Create endpoint handlers for /articles
router.route('/articles')
  .post(articleController.postArticles)
  .get(articleController.getArticles);

// Create endpoint handlers for /articles/:article_id
router.route('/articles/:article_id')
  .get(articleController.getArticle)
  .put(articleController.putArticle)
  .delete(articleController.deleteArticle);

// Register all our routes with /api
app.use('/api', router);


// Start the server
app.listen(port);
console.log('Listening for work on port ' + port);