'use strict';
/**
 * @ngdoc function
 * @name bdl6App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('bdl6App')
  .controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout, $firebaseObject) {
    $scope.isMain = true;
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {rememberMe: true}).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      Auth.$authAnonymously({rememberMe: true}).then(redirect, showError);
    };

    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    $scope.test = function() {
      console.log('hello');
      var teacher = $firebaseObject(Ref.child('Teacher/-KFJT7Uwj94MWXvAubAh'));
      teacher.$bindTo($scope, "testing").then(function() {;
        console.log($scope.testing.Name);
      });
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        Auth.$createUser({email: email, password: pass})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(updateTeacher)
          .then(redirect, showError);
      }

      function updateTeacher(user) {
        var teacher = {
          Name: 'Some name'
        }
        var ref = Ref.child('Teacher');
        ref.child(user.uid).set(teacher);
      }

    };

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }

  

    function redirect() {
      $location.path('/dashboard');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
