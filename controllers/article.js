// Load required packages
var Article = require('../models/article');

// Create endpoint /api/articles for POSTS
exports.postArticles = function(req, res) {
  // Create a new instance of the Article model
  var article = new Article();

  // Set the article properties that came from the POST data
  article.title = req.body.title;
  article.summary = req.body.summary;
  article.publishDate = req.body.publishDate;
  article.publicationName = req.body.publicationName;
  article.articleUrl = req.body.articleUrl;
  article.imageUrl = req.body.imageUrl;
  article.createdByUserId = req.user._id;
  article.dateCreated = new Date();
  article.lastModifiedByUserId =  article.userId = req.user._id;
  article.dateLastModified = new Date();

  // Save the article and check for errors
  article.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Article added to the portfolio!', data: article });
  });
};

// Create endpoint /api/articles for GET
exports.getArticles = function(req, res) {
  // Use the Article model to find all articles
  Article.find(function(err, articles) {
    if (err)
      res.send(err);

    res.json(articles);
  });
};

// Create endpoint /api/articles/:article_id for GET
exports.getArticle = function(req, res) {
  // Use the Article model to find a specific article
  Article.findById(req.params.article_id, function(err, article) {
    if (err)
      res.send(err);

    res.json(article);
  });
};

// Create endpoint /api/articles/:article_id for PUT
exports.putArticle = function(req, res) {
  // Use the Article model to find a specific article
  Article.findById(req.params.article_id, function(err, article) {
    if (err)
      res.send(err);

    if (!article){
      res.json({message: 'Article not found!'});
      return;
    }

    // Set the article properties that came from the PUT data
    article.title = req.body.title;
    article.summary = req.body.summary;
    article.publishDate = req.body.publishDate;
    article.publicationName = req.body.publicationName;
    article.articleUrl = req.body.articleUrl;
    article.imageUrl = req.body.imageUrl;
    article.lastModifiedByUserId =  article.userId = req.user._id;
    article.dateLastModified = new Date();

    // Save the article and check for errors
    article.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Article updated!', data: article});
    });
  });
};

// Create endpoint /api/article/:article_id for DELETE
exports.deleteArticle = function(req, res) {
  // Use the Article model to find a specific article and remove it
  Article.findOneAndRemove({ _id: req.params.article_id, createdByUserId: req.user._id },  function(err, article) {
    if (err)
      res.send(err);

    //console.log("DELETE. Article: " + article);

    if (article)
      res.json({ message: 'Article removed from the portfolio!!!' });
    else
      res.json({ message: 'Article not found, or user not authorised to delete it from the portfolio!!!' });
  });
};