indexApp.directive('post', ['$http', function ($http) {

    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            content: '=',
            a: '='
        },
        templateUrl: '../../html/template/index/post.html',

        compile: function () {
            return {
                pre: function ($scope, iElement, iAttrs) {},

                post: function ($scope, iElement, iAttrs) {
                    //console.log($scope.content);
                }
            }
        },
    }
            }]);
