'use strict';

/* Controllers */

angular.module('App.controllers')
.controller('AppController', ["$scope", "Navigation", "$location", function($scope, Navigation, $location) {
    $scope.showSideMenu = false;

    $scope.slidePage = function (path, type) {
        Navigation.slidePage(path,type);
        $scope.showSideMenu = false; // Close side menu if open
    };

    $scope.toggleSideMenu = function() {
      $scope.showSideMenu = !$scope.showSideMenu;
    }


    $scope.back = function () {
        Navigation.back();
        $scope.showSideMenu = false; // Close side menu if open
    };

    $scope.isActive = function(path) {
        return $location.path() == path;
    }


}])
