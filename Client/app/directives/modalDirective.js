'use strict';

angular.module('locationPics')
.directive('modal', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'>"+
                "<div class='modalPosition' ng-show='show'>"+
                  "<div ng-transclude></div>"+
                  "<button type='button' class='close' ng-click='hideModal()'>&#215;</button>"+
                "</div>"+
                "<div ng-click='hideModal()'></div>"+
              "</div>"
  };
});
