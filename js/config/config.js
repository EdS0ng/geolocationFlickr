'use strict';

//AIzaSyBsmtRxomVJnezAlofMm7gCzb-cyYJRUTc
angular.module('locationPics', ["ui.router"])
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html'
  })
  .state('map', {
    url: '/map',
    templateUrl: 'map.html',
    controller: 'mapCtrl'
  })

});