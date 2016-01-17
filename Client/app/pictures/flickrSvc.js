'use strict';

angular.module("locationPics").service('flickrSvc', flickrSvc);

flickrSvc.$inject=["$http"];

function flickrSvc ($http){

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
}