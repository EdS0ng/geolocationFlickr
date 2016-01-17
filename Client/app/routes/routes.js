'use strict';

//AIzaSyBsmtRxomVJnezAlofMm7gCzb-cyYJRUTc
angular.module('locationPics').config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/home/home.html'
  })
  .state('login', {
    url:'/login',
    templateUrl: 'app/login/login.html',
    controller:'loginCtrl'
  })
  .state('register',{
    url:'/register',
    templateUrl: 'app/register/register.html',
    controller: 'registerCtrl'
  })
  .state('map', {
    url: '/map',
    templateUrl: 'app/map/map.html',
    controller: 'mapCtrl'
  })
  .state('pics', {
    url: '/pics/:id',
    templateUrl: 'app/pictures/pics.html',
    controller: 'picsCtrl'
  })
  .state('profile', {
    url:'/profile',
    templateUrl:'app/profile/profile.html',
    controller: 'profileCtrl'
  })
  .state('fav', {
    url: '/personalboard',
    templateUrl: 'app/favs/favs.html',
    controller: 'favCtrl'
  })
});