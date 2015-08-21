angular.module('eventMgmt.information', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/information', {
    templateUrl: 'information/information.html',
    controller: 'InformationCtrlr'
  });
}])

.controller('InformationCtrlr', function($scope) {
  $scope.informationItems = [];
  console.log($scope.informationItems);
  $scope.addInfo = function(){
      $scope.informationItems.push({title:$scope.eventTitle,description:$scope.eventDescription,timestamp:moment().unix(),sentToServer:false,active:$scope.eventValid});
      console.log($scope.informationItems);
    };
    $scope.eventTitle = "";
    $scope.eventDescription = "";
    $scope.eventValid = "Yes";
});