'use strict';

/* App Module */

angular.module('vdgEmerMgmtApp', [
  'ngRoute',
  'eventMgmt.requests',
  'eventMgmt.information',
  'dndLists'
])
  
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/requests'
      });
  }]);
