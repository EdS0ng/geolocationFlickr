'use strict';

angular.module('locationPics').controller("loginCtrl", loginCtrl);

loginCtrl.$inject = [ 'authSvc', '$state','$scope', '$rootScope'];

function loginCtrl (authSvc, $state, $scope, $rootScope){

  $scope.login = function (loginData){
    authSvc.login(loginData, function (err, resp){
      if (err){
        $scope.err_msg = "Login Failed";
      }else{
        $rootScope.$broadcast('login');
        $state.go('map');
      }
    })
  }
}