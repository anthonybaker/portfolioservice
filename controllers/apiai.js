// Load required packages
var Article = require('../models/article');

// Create endpoint /api/articles for POSTS
exports.postRequest = function(req, res) {

  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  var action = req.body.result.action;
  console.log('Request Action: ' + action);

  if (action == "getarticles") {
    getArticles(res);
  }
  else {

    // fullfillment logic
    resTemplate = {
        "speech": "got the message, but can't understand the action",
        "displayText": "got the message, but can't understand the action",
        "source": "Portfolio Service" 
    }    

    console.log('Response body: ' + JSON.stringify(resTemplate));

    res.setHeader('content-type', 'application/json');
    res.status(200).json(resTemplate);
  }
};

// Get Articles funtion for Api.ai agent
function getArticles (res) {

  // Use the Article model to find all articles
  Article.find(function(err, articles) {
    if (err)
      res.send(err);

    // Generate the Facebook template structure for API.ai agent
    var count = 0;
    var fbArticles = [];
    fbArticle = "";

    articles.forEach(function(article) {

      fbArticle = {
        "title": article.title,
        "image_url": article.imageUrl,
        "item_url": article.articleUrl,
        "subtitle": article.publicationName,
        "buttons": [
          {
            "type": "web_url",
            "url": article.articleUrl,
            "title": "Open Article"
          },
          {
            "type": "postback",
            "title": "Select",
            "payload": article._id
          }
        ]
      }

      fbArticles.push(fbArticle);  

    });

    facebook = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements":
            /* Here goes the list of contacts */
            fbArticles
        }
      }
    }
      
    slack = {
      "text": "got the message, here's an answer from the webhook",
      "attachments": [
          {
              "fallback": "John Smith - R/GA Employee - http://res.cloudinary.com/abakerp/image/upload/v1480872817/Backgrounds_The_man_in_black_tie_zq8mam.jpg",
              "title": "John Smith",
              "title_link": "https://www.rga.com",
              "text": "R/GA Employee",
              "image_url": "http://res.cloudinary.com/abakerp/image/upload/v1480872817/Backgrounds_The_man_in_black_tie_zq8mam.jpg",
              "color": "#764FA5"
          }
      ]
    }

    resTemplate = {
      "speech": "got the message, here's an answer from the webhook",
      "displayText": "got the message, here's an answer from the webhook",
      "source": "Contacts-Manager-Webhook",
      "data": {
          facebook,
          slack
        
      }
    }

    console.log('Response body: ' + JSON.stringify(resTemplate));

    res.setHeader('content-type', 'application/json');
    res.status(200).json(resTemplate);

  });
  
}



