var dashboardApp = angular.module('dashboardApp', ['ngRoute', 'ckeditor', 'ngSanitize', 'angular-bind-html-compile','daterangepicker']);
dashboardApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: './template/report.html'
        , controller: 'insertController'
    })
}]);
dashboardApp.controller('insertController', ['$scope', '$http', function ($scope,$http) {
    $scope.$watch('title', function (newVal, oldVal, scope) {
        console.log('new:' + newVal);
        console.log('old' + oldVal);
    })
    $scope.clickPost = function () {
        var post_data = {
            'title': $scope.title
            , 'author': $scope.author
            , 'category': $scope.category
            , 'content': $scope.content
        }
        var req = {
            method: 'POST'
            , url: 'http://localhost:8080/backend/post/insert'
            , headers: {
                'Content-Type': 'application/json'
            }
            , data: post_data
        }
        $http(req).then(function (response) {
            console.log(response);
        });
    }
}])