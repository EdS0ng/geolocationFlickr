'use strict';

angular.module('locationPics').controller('picsCtrl', picsCtrl);

picsCtrl.$inject = ['$scope', '$stateParams', 'flickrSvc','picBoardSvc','profileSvc'];

function picsCtrl($scope, $stateParams, flickrSvc, picBoardSvc, profileSvc){
  $scope.favs=[];

  profileSvc.pullProfileData(function (err, resp){
    if (err===401) {
      return;
    }
    $scope.favs = resp.data.favorites;
  })

  $scope.done = false;
  var latlng = $stateParams.id.match(/[0-9.]+/g);
  console.log(latlng);
  flickrSvc.pullPics(latlng, function (arr){
    $scope.links = arr;
    $scope.done = true;
  });

  $scope.favorite = function (link){
    picBoardSvc.toggleFav(link, function (err, resp){
      if (err){
        console.log(err);
        return;
      }
      var idx = $scope.favs.indexOf(link);

      if (idx!==-1){
        $scope.favs.splice(idx, 1);
      }else{
        $scope.favs.push(link);
      }
    })
  }
}