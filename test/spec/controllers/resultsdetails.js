'use strict';

describe('Controller: ResultsdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('bdl6App'));

  var ResultsdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ResultsdetailsCtrl = $controller('ResultsdetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
