'use strict';

describe('Controller: QuizResultCtrl', function () {

  // load the controller's module
  beforeEach(module('bdl6App'));

  var QuizResultCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuizResultCtrl = $controller('QuizResultCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
