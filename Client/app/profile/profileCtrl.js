'use strict';

angular.module('locationPics').controller('profileCtrl', profileCtrl);

profileCtrl.$inject=['$scope', '$state','authSvc','storeSvc','profileSvc']

function profileCtrl($scope, $state, authSvc, storeSvc, profileSvc){

  $scope.modalShown = false;
  updateView();

  function updateView() {
    profileSvc.pullProfileData(function (err, resp){
      if (err===401) {
        $state.go('home');
        return;
      }
      storeSvc.saveData('me', resp.data);
      $scope.user = storeSvc.returnData('me');
      $scope.avatarSrc = profileSvc.getAvatarSrc($scope.user);
    })
  }

  $scope.uploadAvatar = function(){
    var avatarData = { _id: storeSvc.returnData('me')._id, img: $scope.images.upload };
    profileSvc.uploadAvatar(avatarData, editResHandler)
  }

  $scope.toggleModal = function(){
    $scope.modalShown = !$scope.modalShown;
  }

  $scope.save = function(form){
    profileSvc.edit(form, editResHandler);
    $scope.modalShown = !$scope.modalShown;
  }

  $scope.delete = function(){
    if (window.confirm("Do you really want to delete your account?")){
      profileSvc.delete(user, function(err, resp){
      if (err){
        console.log(err);
      } else {
        authSvc.logout(function (){
          $state.go('home');
          //broadcast
        });
      }
    });
    }
  }

  function editResHandler(err, resp){
    if (err){
      updateView();
    }else{
      storeSvc.saveData('me', resp.data);
      updateView();
    }
  }
}