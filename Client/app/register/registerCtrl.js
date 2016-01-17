'use strict';

angular.module('locationPics').controller('registerCtrl', registerCtrl);

registerCtrl.$inject= ["authSvc", '$scope', '$state'];

function registerCtrl (authSvc, $scope, $state){

  $scope.register = function (registerData){
    if (registerData.password!==registerData.password2){
      $scope.err_msg = "Passwords Do Not Match";
    }else if(registerData.password.length <6){
      $scope.err_msg = "Minimum Length of Password is 6";
    }else{
      authSvc.register(registerData, function (err, resp){
        if (err){
          $scope.err_msg = "Register Failed";
        }else{
          $state.go('login');
        }
      })
      
    }
  }
}