'use strict';

/* App Module */

angular.module('vdgEmerMgmtApp', [
  'ngRoute',
  'eventMgmt.requests',
  'eventMgmt.information',
  'dndLists'
])
  
.config(['$routeProvider', '$httpProvider',
  function($routeProvider, $httpProvider) {
    
    $httpProvider.defaults.useXDomain = true;
    
    $routeProvider.otherwise({
        redirectTo: '/requests'
      });
  }]);
