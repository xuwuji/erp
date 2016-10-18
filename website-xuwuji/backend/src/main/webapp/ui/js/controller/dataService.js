 'use strict';
 //this is the service to get common data
 angular.module('dashboardApp').service('infoService', ['$q', '$http', function ($q, $http) {
     /**
      * Users DataService
      * Uses embedded, hard-coded data model; acts asynchronously to simulate
      * remote data service call(s).
      *
      * @returns {{loadAll: Function}}
      * @constructor
      */
     // Promise-based API
     return {
         //load the info data
         loadAll: function () {
             //                 var deferred = $q.defer();
             //                 $http.get('http://localhost:8080/backend/data/info').then(function (response) {
             //                     deferred.resolve(response);
             //                 });
             //                 return deferred.promise;
             return $http.get('http://localhost:8080/backend/data/info');
             // return $q.when(users);
         }
     };
}]);