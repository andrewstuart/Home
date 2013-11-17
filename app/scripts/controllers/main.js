'use strict';

angular.module('stuartApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/data/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $http.get('/data/links').success(function(links) {
      $scope.links = links;
    });
  });
