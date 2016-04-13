'use strict';

describe('Controller: NewquizmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('bdl6App'));

  var NewquizmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewquizmodalCtrl = $controller('NewquizmodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
