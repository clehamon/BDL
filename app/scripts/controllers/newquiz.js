'use strict';

/**
 * @ngdoc function
 * @name bdl6App.controller:NewquizCtrl
 * @description
 * # NewquizCtrl
 * Controller of the bdl6App
 */
angular.module('bdl6App')
  .controller('NewquizCtrl', function ($scope, $firebaseObject, $firebaseArray, $routeParams, Ref, Auth) {

  	$scope.quizID = $routeParams.quizID;
  	var aID;
  	var questionArrayKey;
  	var obj;
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

	//Question scope variables
	$scope.questionName;
	$scope.questionImg = "";
	$scope.questionTime = 1;
	$scope.questionType = "multiple";

	function newQuestion() {
		var ref = Ref.child('Question/' + questionArrayKey);
		aID = ref.push({Image: 'temp', Name: '', Time: '', Type: ''});
		var objRef = Ref.child('Question/' + questionArrayKey + '/' + aID.key());
		obj = $firebaseObject(objRef);
		obj.$bindTo($scope, 'quest');
	}

	function populate(id) {
		aID = Ref.child('Question/' + questionArrayKey + '/' + id);
		obj = $firebaseObject(aID);
		obj.$bindTo($scope, 'quest');
		/*obj.$bindTo($scope, 'quest').then(function (){
			$scope.quest.Name = obj.Name;
			$scope.quest.Type = obj.Type;
			$scope.quest.Time = obj.Time;
			$scope.quest.Image = obj.Image;
		});*/
		//console.log($scope.quest);
		loadAnswers();
	}

	function refresh() {
		var ref = Ref.child('Question/' + questionArrayKey);
		var temp = $firebaseArray(ref);
		temp.$loaded().then(function (){
			if (temp.length === 0)
				newQuestion();
			else{
				for (var i = 0; i < temp.length ; i++)
					$scope.questionArray.push(temp[i].$id);
				populate(temp[0].$id);
				$scope.currentQuestion = 1;
			}
		});
/*
		var aref = Ref.child('Answer/' + questionArrayKey + '/' + qid.key());
		var arr = $firebaseArray(aref);
		arr.$loaded().then(function (){
			for (var i = 0; i < arr.length ; i++){
				//$scope.questionArray[i] = arr[i].$id;
				console.log(arr[i]);
			}
		});*/



		//var arr = $firebaseArray(ref);
		//arr.$loaded().then(function (){
		//	for (var i = 0; i < arr.length ; i++){
				//$scope.questionArray[i] = arr[i].$id;
		//		console.log(arr[i].$id);
		//	}
		//});
	}

	$scope.changedQuestion = function(num){
		obj.$destroy();
		populate($scope.questionArray[num]);
		$scope.currentQuestion = num + 1;

/*
		$scope.currentQuestion = num + 1;
		var ref = Ref.child('Question/' + questionArrayKey + '/' + $scope.questionArray[num]);
		var obj = $firebaseObject(ref);
		obj.$bindTo($scope, 'q');
		obj.$loaded().then(function (){
			$scope.$watch('questionName', function(new_value){
        	$scope.q.Name = new_value;
    		});
		});*/
	}

	function loadAnswers() {
		var b = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
		$scope.answerArray = $firebaseArray(b);
	}

	$scope.addAnswerToArray = function(a){
		//var jsonString = angular.toJson(answer);
		//console.log(jsonString);
		//console.log(answer);
		//$scope.answerArray.push(a);

		var b = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
		b.push(a);
		$scope.answerArray = $firebaseArray(b);
		/*
		//console.log(JSON.parse(angular.toJson($scope.answerArray)));
		var aref = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
		var nID = aref.push(a);
		//console.log(nID.key());
		//var nref = Ref.child('Answer/' + questionArrayKey + '/' + aID.key() + '/' + nID.key());
		//var ans = $firebaseObject(nref);
		var b = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
		var ans = $firebaseArray(b);
		ans.$loaded().then(function (){
			for (var i = 0; i < $scope.answerArray.length; i++){
				var ansObj = $firebaseObject(Ref.child('Answer/' + questionArrayKey + '/' + aID.key() + '/' + ans[i].$id));
				ansObj.$bindTo($scope, 'resp').then(function (){
					$scope.resp = $scope.answerArray[i];
					console.log($scope.resp.Name);
				});
			}
		});*/
		/*
		ans.$bindTo($scope, 'resp').then(function (){
			for (var i = 0; i < $scope.answerArray.length; i++){
				$scope.answerArray[i].Name = $scope.resp[i].Name;
				$scope.answerArray[i].Type = $scope.resp[i].Type;
				$scope.answerArray[i].Image = $scope.resp[i].Image;
				$scope.answerArray[i].Time = $scope.resp[i].Time;
				console.log($scope.resp[i]);
			}
		});*/
		//aref.push(JSON.parse(angular.toJson(answer)));
		//aref.push(JSON.parse(angular.toJson($scope.answerArray)));
	}
	//Add question to array
	$scope.addQuestion = function(){
		if ($scope.questionType === "multiple"){
			//var ref = Ref.child('Question/' + questionArrayKey);
			//var qid = ref.push({Image: $scope.questionImg, Name: $scope.questionName, Time: $scope.questionTime, Type: $scope.questionType});
			//var aref = Ref.child('Answer/' + questionArrayKey + '/' + aID.key());
			//aref.push(JSON.parse(angular.toJson($scope.answerArray)));
			//$scope.questionArray.push(aID.key());
			obj.$destroy();
			newQuestion();
		}
		//for (var i = 0; i < $scope.answerArray.length; i++)
		//	aref.push(JSON.parse(angular.toJson($scope.answerArray[i])));
		//var qArray = $firebaseArray(ref);
		//qArray.$add({Image: $scope.questionImg, Name: $scope.questionName, Time: $scope.questionTime, Type: $scope.questionType});
	}


  	//console.log($scope.quiz.Name);
    //$scope.quizRef = Ref.child('Quiz')
  });
