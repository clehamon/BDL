'use strict';

describe('Controller: QuizWaitingCtrl', function () {

  // load the controller's module
  beforeEach(module('bdl6App'));

  var QuizWaitingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuizWaitingCtrl = $controller('QuizWaitingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
