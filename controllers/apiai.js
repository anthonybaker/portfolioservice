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

  // fullfillment logic
  resTemplate = {
      "speech": "here are some articles",
      "displayText": "here are some articles",
      "source": "Portfolio Service" 
  }    

  console.log('Response body: ' + JSON.stringify(resTemplate));

  res.setHeader('content-type', 'application/json');
  res.status(200).json(resTemplate);
  
}



