'use strict';

angular.module('locationPics').service('storeSvc', storeSvc);

function storeSvc(){
  let data = {};

  this.saveData = function(key, info){
    data[key] = info;
  }
  this.returnData = function(key){
    var clone = shallowCloneObject(data);
    return clone[key] || [];
  }

  function shallowCloneObject(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor

    for (var key in obj) {
      temp[key] = shallowCloneObject(obj[key]);
    }

    return temp;
  }

}