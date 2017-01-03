// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// load modules required
var articleController = require('./controllers/article');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var apiAIController = require('./controllers/apiai');

// load environment variables
require('dotenv').config()

// set db connection settings
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbURI = process.env.MONGODB_URI;
//console.log(mongodbURI);

// Connect to the beerlocker MongoDB
mongoose.connect(mongodbURI, options);

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// tell the app where to serve the public static files for our web app
app.use(express.static(__dirname + "/public"));

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /articles
router.route('/articles')
  .post(authController.isAuthenticated, articleController.postArticles)
  .get(authController.isAuthenticated, articleController.getArticles);
  //.get(articleController.getArticles);

// Create endpoint handlers for /articles/:article_id
router.route('/articles/:article_id')
  .get(authController.isAuthenticated, articleController.getArticle)
  .put(authController.isAuthenticated, articleController.putArticle)
  .delete(authController.isAuthenticated, articleController.deleteArticle);

// Create endpoint handlers for /users
router.route('/users')
	// the post should not require authentication before some users are created.
	// otherwise, it wouldn't be possible to add any users, which won't allow authentication in the first place
  .post(authController.isAuthenticated, userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /apiai
router.route('/apiai')
  .post(authController.isAuthenticated, apiAIController.postRequest);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Listening for work on port ' + port);