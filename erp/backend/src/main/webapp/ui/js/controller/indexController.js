var indexApp = angular.module('index', ['ngRoute']);
indexApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/detail/:id', {
        templateUrl: './template/content.html'
        , controller: 'contentController'
    }).
    when('/', {
        templateUrl: './template/post.html'
        , controller: 'postController'
    }).
    when('/category/:category', {
        templateUrl: './template/post.html'
        , controller: 'postController'
    }).
    when('/archive/:archive', {
        templateUrl: './template/post.html'
        , controller: 'postController'
    })
}]);
indexApp.controller('postController', ['$scope', '$http', function ($scope, $http) {
    $scope.pageInfo = {
        currentPage: 1
        , total: 1
        , totalPage: 1
    }
    $scope.postData = [];
    $http({
        method: 'GET'
        , url: 'http://localhost:8080/backend/post/getAllPost'
    }).then(function (response) {
        console.log(response);
        $scope.postData = response.data;
        $scope.pageInfo.total = $scope.postData.length;
        if (($scope.postData.length + 1) % 5 > 0) {
            $scope.pageInfo.totalPage = parseInt(($scope.postData.length + 1) / 5) + 1;
        }
        else {
            $scope.pageInfo.totalPage = (($scope.postData.length + 1) / 5);
        }
        console.log($scope.pageInfo.totalPage);
        if ($scope.pageInfo.total >= 5) {
            var currentContent = $scope.postData.slice(0, 5);
            $scope.content = currentContent;
        }
        else {
            $scope.content = $scope.postData;
        }
    });
    $scope.previousPage = function () {
        $scope.pageInfo.currentPage = $scope.pageInfo.currentPage - 1;
        var previousTotal = ($scope.pageInfo.currentPage) * 5;
        var left = 0;
        var currentContent = $scope.postData;
        $scope.content = currentContent.slice(previousTotal - 5, previousTotal);
    }
    $scope.nextPage = function () {
        $scope.pageInfo.currentPage = $scope.pageInfo.currentPage + 1;
        var previousTotal = ($scope.pageInfo.currentPage - 1) * 5;
        var left = 0;
        if ($scope.pageInfo.total - previousTotal < 5) {
            left = $scope.pageInfo.total - previousTotal;
        }
        else {
            left = 5;
        }
        var currentContent = $scope.postData;
        $scope.content = currentContent.slice(previousTotal, previousTotal + left);
    }
}]);

indexApp.controller('silderController', ['$scope', '$http', function ($scope, $http) {
    $scope.recent = getRecent();
    $scope.comment = getComment();
    $scope.archive = getArchive();
    $scope.category = getCategory();
}]);

indexApp.controller('contentController', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.detail = getDetail();
    //console.log($scope.detail);
}]);