'use strict';

function log (){
  console.log('loaded');
}

angular.module('locationPics', ["ui.router","LocalStorageModule","naif.base64"])
.config(['localStorageServiceProvider', function (localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('locationPics');
}]);


