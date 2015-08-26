'use strict';

/* Controllers */

angular.module('eventMgmt.requests', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/requests', {
    templateUrl: 'requests/request-list.html',
    controller: 'RequestListCtrlr'
  });
}])
  
.controller('RequestListCtrlr',
  function($scope, $http) {
    $http.get('http://www.downers.us/public/json/request_data_emer.json').then(function(response) {
      var data = response.data;
      
      $scope.requestTypes = data.types;
      
      $scope.emergencyMode = data.emerMode;
      
      if ($scope.emergencyMode){
        $scope.emergencyModeStatus = 'Update EM';
        console.log(data.emerType);
        for (var i = 0; i < $scope.emergencyScenarios.length; i++){
          if ($scope.emergencyScenarios[i].name == data.emerType){
            $scope.selectedScenario = $scope.emergencyScenarios[i];
            break;
          }
        }
      } else {
        $scope.emergencyModeStatus = 'Start EM';
      }
      
      $scope.requestState = {
        selected: null,
        lists: {"in":[],"all":[]}
      };
      angular.forEach($scope.requestTypes,function(value,key){
        value.Name = key;
        if ($scope.emergencyMode && data.emerRequests.indexOf(value.RequestID+"") != -1){
          $scope.requestState.lists.in.push(value);
          value.included = true;
        }
        $scope.requestState.lists.all.push(value);
        
      });
    });
    
    $scope.moveRequest = function(request,list,index){
      
      var all = $scope.requestState.lists['all'];
      var events = $scope.requestState.lists['in'];
      if (list === 'all'){
        request.included = true;
        events.push(request);
      } else {
        for (var i = 0; i< events.length; i++){
          if (events[i] == request){
            events.splice(i,1);
            break;
          }
        }
        for (var i = 0; i< all.length; i++){
          if (all[i] == request){
            all[i].included = false;
            break;
          }
        }
      }
      $scope.requestState.selected = null;
    };
    
    $scope.emergencyScenarios = [{name:'Snow',query:function(){
                                    var event = [];
                                    angular.forEach($scope.requestState.lists['all'],function(value,key){
                                      value.included = false;
                                      if (value.category === 'Snow' || value.Name === 'General '){
                                        value.included = true;
                                        event.push(value);
                                      } 
                                    });
                                    return event;
                                  }},
                                 {name:'Flooding',query:function(){
                                    var event = [];
                                    angular.forEach($scope.requestState.lists['all'],function(value,key){
                                      value.included = false;
                                      if (value.category === 'Drainage' && value.Name !== 'Drainage - Cost Share'){
                                        value.included = true;
                                        event.push(value);
                                      } 
                                    });
                                    var trees = [];
                                    angular.forEach($scope.emergencyScenarios,function(value,key){
                                      if (value.name === 'Wind'){
                                        trees = value.query(true);
                                      }
                                    });
                                    return event.concat(trees);
                                 }},
                                 {name:'Wind',query:function(skipReset){
                                   var event = [];
                                   angular.forEach($scope.requestState.lists['all'],function(value,key){
                                      if (!skipReset) {
                                        value.included = false;
                                      }
                                      if ((value.category === 'Trees' && value.Name.indexOf('Inspection') === -1 && value.Name.indexOf('Request') === -1) || value.Name === 'General '){
                                        value.included = true;
                                        event.push(value);
                                      } 
                                    });
                                    return event;
                                 }},
                                 {name:'Other',query:function(){
                                   var event = [];
                                   angular.forEach($scope.requestState.lists['all'],function(value,key){
                                      value.included = false;
                                      if (value.Name === 'General '){
                                        value.included = true;
                                        event.push(value);
                                      } 
                                    });
                                    return event;
                                 }}
                                ];
    
    $scope.updateRequestsForScenarios = function(emergType){
      $scope.requestState.lists['in'] = $scope.selectedScenario.query();
    };
    
    $scope.updateEmergencyMode = function(){
      console.log("Update EGMT Mode");
      var requests = $scope.requestState.lists['in'];
      var requestIDs = [];
      for (var i = 0; i < requests.length; i++){
        requestIDs.push(requests[i].RequestID);
      }
      if (requestIDs.length == 0){
        alert("Please select at least one request");
        return;
      }
      
      /*$http.get('http://gis.vodg.us/requests/support_files/etl/startemergencymode.py').then(function(response){
        console.log(response);
      });*/
      var req = {
        method: 'GET',
        url: 'http://gis.vodg.us/requests/support_files/startemergencymode.py',
        params: {requests:requestIDs.toString(),scenario:$scope.selectedScenario.name}
      };
      $http(req).then(function(response){
        console.log(response);
      });
    };
    
    $scope.stopEmergencyMode = function(){
      var req = {
        method: 'GET',
        url: 'http://gis.vodg.us/requests/support_files/startemergencymode.py',
        params: {requests:'None'}
      };
      $http(req).then(function(response){
        console.log(response);
      });
    };
    
  });