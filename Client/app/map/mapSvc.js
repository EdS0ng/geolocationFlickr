'use strict';


angular.module("locationPics").service('mapSvc', function (){
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
            content: '<a href="/pics/'+this.getPosition()+'">See pictures at this location?</a>'
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
            content: '<a href="/pics/'+this.getPosition()+'">See pictures at this location?</a>'
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