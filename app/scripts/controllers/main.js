'use strict';

/**
 * @ngdoc function
 * @name antstatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the antstatApp
 */
angular.module('antstatApp')
  .controller('MainCtrl', ['$scope', '$http',  function ($scope,$http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.meme = 'AA';
  
    $http.get('./data/ht_15.json').success(function(data) {
    	$scope.ht15 = data;
    		$http.get('./data/ht_16.json').success(function(data) {
         	$scope.ht16 = data;
          
    	});
          
    });



  }]);
