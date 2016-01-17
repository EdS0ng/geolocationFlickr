'use strict';

angular.module('locationPics').controller('favCtrl', favCtrl);

favCtrl.$inject = ['$scope','picBoardSvc','profileSvc'];

function favCtrl($scope, picBoardSvc, profileSvc){
  $scope.done = false;

  profileSvc.pullProfileData(function (err, resp){
    if (err===401) {
      return;
    }
    $scope.favs = resp.data.favorites;
    $scope.done = true;
  })

  $scope.unfavorite = function (link){
    picBoardSvc.toggleFav(link, function (err, resp){
      if (err){
        console.log(err);
        return;
      }
      var idx = $scope.favs.indexOf(link);
      $scope.favs.splice(idx, 1);
    })
  }

}