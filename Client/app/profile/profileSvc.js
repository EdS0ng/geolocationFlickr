'use strict';

angular
  .module('locationPics')
  .service('profileSvc', ['$http', profileSvc]);

function profileSvc($http){

  this.edit = function(data, cb){
    delete data.avatar;
    $http({
      method: 'PUT',
      url: '/API/users',
      data: data
    }).then(function(resp){
      cb(null,resp)
    }, function(err){
      cb(err)
    });
  }

  this.delete = function(user, cb){
    var data = {_id: user._id};
    $http({
      method: 'DELETE',
      url: '/API/users',
      headers: {"Content-Type": "application/json;charset=utf-8"},
      data: data
    }).then(function(resp){
      cb(null, resp)
    }, function(err){
      cb(err)
    });
  }

  this.uploadAvatar = function(updateData, cb){
    $http.post('/API/users/avatar', updateData)
    .then(function(resp){
      cb(null, resp);
    }, function(err){
      cb(err);
    })
  }

  this.getAvatarSrc = function(user){
    var defaultUrl = "http://www.bathspa.ac.uk/media/WebProfilePictures/default_profile.jpg";
    var userAvatar = user.avatar ? avatarImgSrc(user) : null;
    return userAvatar || defaultUrl;
  }

  function avatarImgSrc(user){
    var data = user.avatar.img.data;
    var type = user.avatar.img.contentType;
    return `data:${type};base64,${data}`
  }

  this.pullProfileData = function(cb){
    $http.get('/API/users/me')
      .then(function(resp){
        cb(resp.status, resp)
      }, function(err){
        console.log(err)
        cb(err.status)
      });
  }
}