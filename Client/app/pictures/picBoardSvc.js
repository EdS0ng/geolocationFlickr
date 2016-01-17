'use strict';

angular.module('locationPics').service('picBoardSvc', picBoardSvc);

picBoardSvc.$inject=['$http'];

function picBoardSvc ($http){

   this.toggleFav = function(link, cb){
    $http.post('/API/users/favorite', {favorites: link})
    .then(function(resp){
      cb(null,resp)
    }, function(err){
      cb(err)
    });
  }
}