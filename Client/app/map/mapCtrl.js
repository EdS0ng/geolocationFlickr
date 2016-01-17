'use strict';

angular.module("locationPics").controller('mapCtrl', mapCtrl);

mapCtrl.$inject = ["mapSvc"];

function mapCtrl (mapSvc){
  mapSvc.initMap();
}