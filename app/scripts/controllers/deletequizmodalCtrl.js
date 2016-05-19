'use strict';

angular.module('bdl6App')
  .controller('DeletequizmodalCtrl', function ($scope, $uibModal, $uibModalInstance, Ref, $firebaseObject, quizID, quizName) {

  	$scope.qName = quizName;

    $scope.close = function() {
    	$uibModalInstance.close();
    };

    $scope.yes = function() {
    	var ref = Ref.child('Quiz/' + Ref.getAuth().uid + '/' + quizID);
    	var obj = $firebaseObject(ref);
    	obj.$loaded().then(function (){
    		removeData(Ref.child('Question/' + obj.Questions));
    		removeData(Ref.child('Answer/' + obj.Questions));
    		obj.$remove().then(function (ref) {
    			//data has been deleted locally and in the database
    		}, function(error) {
    			console.log("Error:", error);
    		});
    		$uibModalInstance.close();
    	});
    };

    function removeData(ref){
    	var obj = $firebaseObject(ref);
		obj.$remove().then(function(ref) {
			// data has been deleted locally and in the database
		}, function(error) {
			console.log("Error:", error);
		});
	}

  }); 