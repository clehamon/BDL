'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('DashboardCtrl', function ($scope, $uibModal) {
   
   $scope.animationsEnabled = true;

   $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../views/newquizmodal.html',
      controller: 'NewquizmodalCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    $scope.launchSession = function(quizID){
      var min = 1000;
      var max = 9999;
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
    }


  };
});
