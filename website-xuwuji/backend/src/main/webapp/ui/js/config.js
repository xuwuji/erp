var dashboardApp = angular.module('dashboardApp', ['ui.router', 'ngMaterial', 'ngMessages', 'ckeditor', 'ngSanitize', 'angular-bind-html-compile', 'angular-bootstrap-select', 'daterangepicker', 'highcharts-ng']);
dashboardApp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);
dashboardApp.config(function ($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('YYYY-MM-DD');
    };
});
dashboardApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.
    state('report', {
        url: '/'
        , views: {
            'dashboardView': {
                templateUrl: './template/report.html'
                , controller: 'reportController'
            }
        }
    }).state('insert', {
        url: '/insert'
        , views: {
            'dashboardView': {
                templateUrl: './template/insert.html'
                , controller: 'insertController'
            }
        }
    }).state('advance', {
        url: '/advance'
        , views: {
            'dashboardView': {
                templateUrl: './template/advance.html'
                , controller: 'advanceController'
            }
        }
    })
}]);