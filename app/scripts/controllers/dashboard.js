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


  };
});
