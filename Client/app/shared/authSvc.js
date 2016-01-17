'use strict';

angular.module('locationPics').service('authSvc', authSvc);

authSvc.$inject=['$http', 'localStorageService'];

function authSvc($http, localStorageService){

  this.checkLoginStatus = function (cb){
    var self = this;
    $http({method:'GET', url:'/API/auth/check'})
    .then(function (success){
      cb(null, 'ok');
    }, function (err){
      cb(err);
    })
    
  }

  this.login = function (loginData, cb){
    var self = this;
    $http.post('/API/auth/login', loginData).then(function (resp){
      localStorageService.set('token', `Bearer ${resp.data.token}`)
      cb(null, resp);
    }, function (err){
      cb(err);
    });
  }

  this.register = function (registerData, cb){
    console.log('preregister')
    $http.post('/API/auth/register', registerData).then(function (resp){
      console.log('success')
      cb(null, resp);
    },function (err){
      console.log('fail')
      cb(err);
    })
  }

  this.logout = function (){
    localStorageService.remove("token")
  }
}