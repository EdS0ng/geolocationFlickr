'use strict';

angular.module('locationPics').factory('authHeaderInterceptor', authHeaderInterceptor);

authHeaderInterceptor.$inject = ['localStorageService'];

function authHeaderInterceptor (localStorageService){
  var authHeaderInjector = {
        request: function(config) {
            if (config.url.startsWith('/API') && !config.headers.Authorization) {
                config.headers['Authorization'] = localStorageService.get('token');
            }
            return config;
        }
    };
  return authHeaderInjector; 
}