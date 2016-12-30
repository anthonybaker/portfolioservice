angular.module("portfolioApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    articles: function(Articles) {
                        return Articles.getArticles();
                    }
                }
            })
            .when("/new/article", {
                controller: "NewArticleController",
                templateUrl: "article-form.html"
            })
            .when("/article/:articleId", {
                controller: "EditArticleController",
                templateUrl: "article.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Articles", function($http) {
        this.getArticles = function() {
            return $http.get('api/articles')
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding articles.");
                });
        }
        this.createArticle = function(article) {
            return $http.post("api/articles", article).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating article.");
                });
        }
        this.getArticle = function(articleId) {
            var url = "api/articles/" + articleId;
            console.log("Getting article with id: " + articleId);
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this article.");
                });
        }
        this.editArticle = function(article) {
            var url = "api/articles/" + article._id;
            console.log(article._id);
            return $http.put(url, article).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this article.");
                    console.log(response);
                });
        }
        this.deleteArticle = function(articleId) {
            var url = "api/articles/" + articleId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting this article.");
                    console.log(response);
                });
        }
    })
    .controller("ListController", function(articles, $scope) {
        $scope.articles = articles.data;
    })
    .controller("NewArticleController", function($scope, $location, Articles) {
        $scope.back = function() {
            $location.path("/");
        }

        $scope.saveArticle = function(article) {
            Articles.createArticle(article).then(function(doc) {
                var articleUrl = "api/article/" + doc.data._id;
                $location.path(articleUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditArticleController", function($scope, $routeParams, Articles) {
        Articles.getArticle($routeParams.articleId).then(function(doc) {
            $scope.article = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.articleFormUrl = "article-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.articleFormUrl = "";
        }

        $scope.saveArticle = function(article) {
            Articles.editArticle(article);
            $scope.editMode = false;
            $scope.articleFormUrl = "";
        }

        $scope.deleteArticle = function(articleId) {
            Articles.deleteArticle(articleId);
        }
    });