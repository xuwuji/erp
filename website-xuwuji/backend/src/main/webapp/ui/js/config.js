var dataApp = angular.module('dataApp', [ 'ui.router', 'ngMaterial',
		'ngMessages', 'ckeditor', 'ngSanitize', 'angular-bind-html-compile',
		'angular-bootstrap-select', 'daterangepicker', 'highcharts-ng',
		'uiRouterStyles' ]);
dataApp.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

dataApp.constant('userRole', {
	'username' : 'hongtao',
	'normalUser' : {
		username : 'hongtao',
		password : 'hongtao'
	},
	'superUser' : {
		username : 'hongtao',
		password : 'admin'
	}
})

dataApp.service('authService', function() {
	var role = {};
	role.current = 'normal';
	return {
		setNormal : function() {
			role.current = 'normal';
		},
		setSuper : function() {
			role.current = 'super';
		},
		isNormal : function() {
			if (role.current === 'normal') {
				return true;
			} else {
				return false;
			}
		},
		isSuper : function() {
			if (role.current === 'super') {
				return true;
			} else {
				return false;
			}
		}
	};
});

dataApp.config(function($mdDateLocaleProvider) {
	$mdDateLocaleProvider.formatDate = function(date) {
		return moment(date).format('YYYY-MM-DD');
	};
});
dataApp.config([ '$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			// when empty, set it to default location
			$urlRouterProvider.when('', '/');
			// when get into the system, default page is the report page
			$urlRouterProvider.when('/dashboard', '/dashboard/report');

			$stateProvider.state('login', {
				url : '/',
				templateUrl : '../login/login.html',
				controller : 'loginController',
				data : {
					css : '../../css/login.css'
				}
			}).state('dashboard', {
				url : '/dashboard',
				templateUrl : '../dashboard/dashboard.html',
			}).state('dashboard.report', {
				url : '/report',
				views : {
					'dashboardView' : {
						templateUrl : '../dashboard/template/report.html',
						controller : 'reportController'
					}
				}
			}).state('dashboard.insert', {
				url : '/insert',
				views : {
					'dashboardView' : {
						templateUrl : '../dashboard/template/insert.html',
						controller : 'insertController'
					}
				}
			}).state('dashboard.advance', {
				url : '/advance',
				views : {
					'dashboardView' : {
						templateUrl : '../dashboard/template/advance.html',
						controller : 'advanceController'
					}
				}
			})
		} ]);

dataApp.run(function($rootScope, $state) {
	// set a global variable, check if the user log in
	$rootScope.logStatus = false;
	// when the state change, do the log in check
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams,
			fromState, fromParams) {
		// if it is the login page, skip
		if (toState.name == 'login') {
			return;
		}
		// if the user not login, back to the login page
		if (!$rootScope.logStatus) {
			// cancel the default jump event
			event.preventDefault();
			// jump to the login state
			$state.go("login", {
				from : fromState.name,
				w : 'notLogin'
			});
		}
	});
})
