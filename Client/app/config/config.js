'use strict';

angular.module('locationPics').config(['$httpProvider', function ($httpProvider){
  $httpProvider.interceptors.push('authHeaderInterceptor');
}])