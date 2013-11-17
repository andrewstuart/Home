'use strict';

angular.module('stuartApp')
  .controller('AdminCtrl', function ($scope, $http) {

  $http.get('/data/links').success(function(links) {
    $scope.links = links;
  })

  $scope.addLink = function() {
    $scope.links = $scope.links || [];
    $scope.links.push({});
  }

  $scope.removeLink = function(index) {
    $http.delete('/data/links/' + $scope.links[index]._id).success(function() {
      $scope.links.splice(index, 1);
    })
  }

  $scope.saveLink = function(link) {
    if(link._id) {
      $http.put('/data/links/' + link._id, link).success( function(newLink) {
        links[links.indexOf(link)] = newLink;
      });
    } else {
      $http.post('/data/links', link).success( function(newLink) {
        links[links.indexOf(link)] = newLink;
      });
    }

  }

});
