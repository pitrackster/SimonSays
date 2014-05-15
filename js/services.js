'use strict';
/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.value('version', '0.1');

appServices.factory('about', ['$resource',
    function($resource) {
        return $resource('datas/about.json', {}, {
            query: {method: 'GET', isArray: false}
        });

    }]);

appServices.factory('config', ['$resource',
    function($resource) {
        return $resource('datas/config.json', {}, {
            query: {method: 'GET', isArray: false}
        });
    }]);

appServices.factory('scores', ['$resource',
    function($resource) {
        return $resource('datas/scores.json', {}, {
            query: {method: 'GET', isArray: false}
        });
    }]);