'use strict';

describe('Controller: QuizQuestionCtrl', function () {

  // load the controller's module
  beforeEach(module('bdl6App'));

  var QuizQuestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuizQuestionCtrl = $controller('QuizQuestionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
