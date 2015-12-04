'use strict';

function log (){
  console.log('loaded');
}

//1ebf42df6f7bbef1
// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a4bc8822cfb9f2255b933ab7891ef9e&tags=greece&format=json&nojsoncallback=1
var app = angular.module('locationPics', ["ui.bootstrap", "ui.router"]);
app.config(function ($stateProvider, $urlRouterProvider) {

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
  .state('pics', {
    url: '/pics/:id',
    templateUrl: 'pics.html',
    controller: 'flickrCtrl'
  })
});

app.controller('flickrCtrl', function ($scope, $stateParams, flickrSvc){
  $scope.links = [];
  $scope.done = false;
  var latlng = $stateParams.id.match(/[0-9.]+/g);
  console.log(latlng);
  flickrSvc.pullPics(latlng, function (arr){
    $scope.links = arr;
    $scope.done = true;
  });

})

app.controller('mapCtrl', function (mapSvc, $http, $scope){
  mapSvc.initMap();
})

app.service('flickrSvc', function ($http){

  this.pullPics = function (pos, cb){
    var lat = pos[0];
    var lng = pos[1];
    $http.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6a4bc8822cfb9f2255b933ab7891ef9e&lat='+lat+'&lon='+lng+'&radius=10&format=json&nojsoncallback=1').then(function (resp){
      var links=[];
      resp.data.photos.photo.forEach(function (ids){
        var link = 'https://farm'+ids.farm+'.staticflickr.com/'+ids.server+'/'+ids.id+'_'+ids.secret+'_q.jpg';
        links.push(link);
      })
      cb(links);
    })
  }
})

app.service('mapSvc', function (){
  this.Marker = {};

  this.handleLocationError = function (browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  }

  this.initMap = function (){
    var self = this;
    var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
    });
    
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location
        });

        marker.addListener('click', function() {
          var infowindow = new google.maps.InfoWindow({
            content: '<a href="#/pics/'+this.getPosition()+'">See pictures at this location?</a>'
          });
          infowindow.open(map, marker);
        });

        markers.push(marker);

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var marker = new google.maps.Marker({
          map:map,
          position:pos,
          title: 'Your Location'
        });

        marker.addListener('click', function() {
          var infowindow = new google.maps.InfoWindow({
            content: '<a href="#/pics/'+this.getPosition()+'">See pictures at this location?</a>'
          });
          infowindow.open(map, marker);
        });

        map.setCenter(pos);
        google.maps.event.addListener(map, 'click', function(event) {
          marker.setPosition(event.latLng);
          map.setCenter(marker.getPosition());
        });
      });
    }else {
      var infoWindow = new google.maps.InfoWindow({map: map});
      self.handleLocationError(false, infoWindow, map.getCenter());
    }
  }

})