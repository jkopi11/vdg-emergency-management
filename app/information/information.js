angular.module('eventMgmt.information', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/information', {
    templateUrl: 'information/information.html',
    controller: 'InformationCtrlr'
  });
}])

.controller('InformationCtrlr', function($scope, $http) {
  
  function copyObject(obj){
    return JSON.parse(JSON.stringify(obj));
  }
  
  function resetEdit(){
    $scope.editInfo = {title:null,description:null,active:'Yes'};
  }
  
  $scope.resetEditInfo = function(){
    $scope.editMode = false;
    resetEdit();
  };
  
  resetEdit();
  
  $scope.informationItems = [];
  console.log($scope.informationItems);
  
  $scope.addInfo = function(){
    $scope.editInfo.timestamp = moment().unix();
    $scope.editInfo.sentToServer = false; 
    $scope.informationItems.push($scope.editInfo);
    console.log($scope.informationItems);
    resetEdit();
  };
  
  $scope.getOriginal = function(item){
    $scope.original = copyObject(item);
  }
  
  $scope.postChangesToServer = function(){
    console.log({eventItems:$scope.informationItems});
    $http({
      url: 'http://gis.vodg.us:1337/eventItems/',
      method: 'POST',
      data: JSON.stringify({eventItems:$scope.informationItems}),
      dataType: 'json'
    }).then(function(response){
      console.log(response);
      if (response.success){
        alert("Items have been posted to server.");
      } 
    });
  }
});

