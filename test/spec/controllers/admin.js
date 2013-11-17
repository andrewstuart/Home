'use strict';

describe('Controller: AdminCtrl', function () {

  // load the controller's module
  beforeEach(module('stuartApp'));

  var AdminCtrl,
    scope,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    AdminCtrl = $controller('AdminCtrl', {
      $scope: scope
    });
    httpBackend.when('GET', '/data/links')
      .respond([{href: '/', text: 'Home'}]);
  }));

  describe('link editing', function() {
    it('should let links be edited', function() {
      expect(scope.links.length).toEqual(1);
    });
  });
});
