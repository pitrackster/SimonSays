'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('simmonSays', [
  'ngRoute',
  'ngResource',
  'appFilters',
  'appServices',
  'appDirectives',
  'appControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
  $routeProvider.when('/play', {templateUrl: 'partials/play.html', controller: 'PlayCtrl'});
  $routeProvider.when('/scores', {templateUrl: 'partials/scores.html', controller: 'ScoresCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
