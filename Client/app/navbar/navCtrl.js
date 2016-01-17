'use strict';

angular.module('locationPics').controller('navCtrl', navCtrl);

navCtrl.$inject=['$scope', 'authSvc','$state'];

function navCtrl ($scope, authSvc, $state){
  $scope.showMenu = false;

  authSvc.checkLoginStatus(function (err, resp){
    if (err) {
      $scope.logged_in = false;
    }else{
      $scope.logged_in=true;
    }
  });

  $scope.$on('login', function (){
    console.log('login event');
    $scope.logged_in=true;
  })

  $scope.toggleMenu = function (){
    $scope.showMenu = !$scope.showMenu;
  }
  
  $scope.logout = function (){
    authSvc.logout();
    $state.go('home');
    $scope.logged_in = false;
  }

  
}