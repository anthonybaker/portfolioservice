// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// load modules required
var Article = require('./models/article');

// load environment variables
require('dotenv').config()

// set db connection settings
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbURI = process.env.MONGODB_URI;
console.log(mongodbURI);

// Connect to the beerlocker MongoDB
mongoose.connect(mongodbURI, options);

// var conn = mongoose.connection;             
 
// conn.on('error', console.error.bind(console, 'connection error:'));  

// conn.once('open', function() {
//   // Wait for the database connection to establish, then start the app.  

//   console.log('started')
//     new_user.save(function(err) {
//         if (err) throw err;
//         console.log('User created!');
//     });

//   console.log("connected to the db...");                       
// });

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

// Create a new route with the prefix /beers
var articlesRoute = router.route('/articles');

// Create endpoint /api/articles for POSTS
articlesRoute.post(function(req, res) {
  // Create a new instance of the Article model
  var article = new Article();

  // Set the article properties that came from the POST data
  article.title = req.body.title;
  article.summary = req.body.summary;
  article.publishDate = req.body.publishDate;
  article.publicationName = req.body.publicationName;
  article.articleUrl = req.body.articleUrl;
  article.imageUrl = req.body.imageUrl;

  // Save the article and check for errors
  article.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Article added to the portfolio!', data: article });
  });
});

// Create endpoint /api/articles for GET
articlesRoute.get(function(req, res) {
  // Use the Article model to find all beer
  Article.find(function(err, articles) {
    if (err)
      res.send(err);

    res.json(articles);
  });
});

// Register all our routes with /api
app.use('/api', router);


// Start the server
app.listen(port);
console.log('Insert work on port ' + port);