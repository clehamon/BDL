'use strict';

describe('Controller: StuendCtrl', function () {

  // load the controller's module
  beforeEach(module('bdl6App'));

  var StuendCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StuendCtrl = $controller('StuendCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
