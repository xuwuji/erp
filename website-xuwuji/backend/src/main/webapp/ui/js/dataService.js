'use strict';
// this is the service to get common data
angular.module('dataApp').service('dataService',
		[ '$q', '$http', function($q, $http) {
			/**
			 * DataService promise base for data service(optional)
			 * 
			 * @constructor
			 */
			// Promise-based API
			return {
				// load the info data
				loadInfo : function() {
					// var deferred = $q.defer();
					// $http.get('http://localhost:8080/backend/data/info').then(function
					// (response) {
					// deferred.resolve(response);
					// });
					// return deferred.promise;
					return $http.get('/backend/data/info');
					// return
					// $http.get('http://9tmys.ngrok.natapp.cn/backend/data/info');
					// return $q.when(users);
				},
				getAll : function() {
					return $http.get('/backend/data/all')
				},
				getData : function(request) {
					return $http({
						method : 'Post',
						url : '/backend/data/get',
						headers : {
							'Content-Type' : 'application/json'
						},
						data : request
					})
				},
				getById : function(url) {
					this.getRequest(url);
				},

				getRequest : function(url) {
					return $http.get(url);
				},

				deleteRecord : function(url) {
					this.getRequest(url);
				},
				postRequest : function(url, data) {
					return $http({
						method : 'Post',
						url : url,
						headers : {
							'Content-Type' : 'application/json'
						},
						data : data
					})
				},
				updateRecord : function(url, data) {
					this.postRequest(url, data);
				}
			};
		} ]);