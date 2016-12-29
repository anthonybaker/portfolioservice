// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ArticleSchema   = new mongoose.Schema({
  title: String,
  summary: String, 
  publishDate: Date,
  publicationName: String,
  articleUrl: String,
  imageUrl: String,
  createdByUserId: String,
  dateCreated: Date,
  lastModifiedByUserId: String,
  dateLastModified: Date
});

// Export the Mongoose model
module.exports = mongoose.model('Article', ArticleSchema);