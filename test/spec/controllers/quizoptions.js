'use strict';

describe('Controller: QuizoptionsCtrl', function () {

  // load the controller's module
  beforeEach(module('bdl6App'));

  var QuizoptionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuizoptionsCtrl = $controller('QuizoptionsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
