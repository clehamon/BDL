'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:NewquizCtrl
 * @description
 * # NewquizCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('NewquizCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, Ref, Auth, $location) {

  	$scope.quizID = $routeParams.quizID;
  	var aID;
  	var questionArrayKey;
  	var obj;
  	var ansImg;
  	$scope.answerArray = [];
  	$scope.currentQuestion;
  	$scope.questionArray = [];

  	//Set-up quiz reference and binding
  	var quizRef = Ref.child('Quiz/' + Ref.getAuth().uid + '/' + $scope.quizID);
  	var quizObj = $firebaseObject(quizRef);
	quizObj.$bindTo($scope, 'quiz');
	
	//Get the Question array key
	quizObj.$loaded().then(function () {
  		questionArrayKey = quizObj.Questions;
  		refresh();
	});

	function newQuestion() {
		var ref = Ref.child('Question/' + questionArrayKey);
		aID = ref.push({Image: 'temp', Name: '', Time: 20, Type: 'multiple'});
		//var objRef = Ref.child('Question/' + questionArrayKey + '/' + aID.key());
		//obj = $firebaseObject(objRef);
		//obj.$bindTo($scope, 'quest');
		//$scope.questionArray.push(aID.key());
		//$scope.currentQuestion = $scope.questionArray.length;
		populate(aID.key());
	}

	function populate(id) {
		aID = Ref.child('Question/' + questionArrayKey + '/' + id);
		obj = $firebaseObject(aID);
		obj.$bindTo($scope, 'quest');
		loadAnswers();
	}

	function refresh() {
		var ref = Ref.child('Question/' + questionArrayKey);
		var temp = $firebaseArray(ref);
		temp.$loaded().then(function (){
			if (temp.length === 0){
				newQuestion();

				$scope.questionArray.push(aID);
				//MUDEI LINHA DE BAIXO
				//$scope.questionArray.push(aID.key());
				$scope.currentQuestion = $scope.questionArray.length;
				location.reload();
			}
			else{
				for (var i = 0; i < temp.length ; i++)

					$scope.questionArray.push(temp[i]);
					//MUDEI LINHA DE BAIXO
					//$scope.questionArray.push(temp[i].$id);
				populate(temp[0].$id);
				$scope.currentQuestion = 1;
			}
		});
	}

	$scope.changedQuestion = function(num){
		if(parseInt($scope.questionArray.length) === 0)
			refresh();
		else if(num > -1 && num < $scope.questionArray.length + 1){
			obj.$destroy();
			populate($scope.questionArray[num].$id);
			//MUDEI LINHA DE BAIXO
			//populate($scope.questionArray[num]);
			$scope.currentQuestion = num + 1;
		}
		
	}

	function loadAnswers() {
		var b = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
		$scope.answerArray = $firebaseArray(b);
	}

	$scope.addAnswerToArray = function(a){
		if ($scope.answerArray.length !== 4){
			var b = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
			b.push(a);
			$scope.answerArray = $firebaseArray(b);
		}
	}

	//Add question to array
	$scope.addQuestion = function(){
		obj.$destroy();
		newQuestion();

		var ref = Ref.child('Question/' + questionArrayKey);
		var temp = $firebaseArray(ref);
		temp.$loaded().then(function(){
			$scope.questionArray.push(temp[temp.length - 1]);
			$scope.currentQuestion = $scope.questionArray.length;
		});
		$scope.selection.selectedNode = $scope.currentQuestion;
		//$scope.questionArray.push(aID);
		//MUDEI LINHA DE BAIXO
		//$scope.questionArray.push(aID.key());
		
		//changedQuestion($scope.questionArray.length - 1);
	}

	$scope.removeQuestion = function (index){
		console.log(index);
		var questionID = $scope.questionArray[index].$id;
		var ref = Ref.child('Question/' + questionArrayKey + '/' + questionID);
		var deleteQuestion = $firebaseObject(ref);
		deleteQuestion.$remove().then(function (ref){
			removeAnswers(questionID);
			$scope.questionArray.splice(index, 1);
			if (index > 0)
				$scope.changedQuestion(index - 1);
			else
				$scope.changedQuestion(0);
		}, function(error){
			console.log("Error here:", error);
		});
		if (index > 0)
			$scope.selection.selectedNode = $scope.currentQuestion - 2;
	}

	function removeAnswers (id){
		var ref = Ref.child('Answer/' + questionArrayKey + '/' + id);
		var deleteAns = $firebaseObject(ref);
		deleteAns.$remove().then(function (ref) {
			//data has been deleted locally and in the database
		}, function(error) {
			console.log("Error there:", error);
		});
	}

	$scope.removeAns = function (id){
		var ref = Ref.child('Answer/' + questionArrayKey + '/' + aID.key() + '/' + id);
		var deleteAns = $firebaseObject(ref);
		deleteAns.$remove().then(function (ref) {
			//data has been deleted locally and in the database
			loadAnswers();
		}, function(error) {
			console.log("Error everywhere:", error);
		});
	}

	$scope.saveImage = function(e1, id) {
		var ref = Ref.child('Answer/' + questionArrayKey + '/' + aID.key() + '/' + id);
		ansImg = $firebaseObject(ref);
		ansImg.$loaded().then(function(){
			getFile(e1);
		});
	}

	function getFile (e1) {
		var fr = new FileReader();
		fr.onload = function(event) {
			ansImg.Picture = fr.result;
			ansImg.$save().then(function (val) {
				//
			}, function (e) {
				console.log(e);
			})
		};
		fr.readAsDataURL(e1);
	}

	$scope.done = function(){
		$location.path('dashboard');
	}

	$scope.print = function(){
		console.log('worked');
	}

  });
