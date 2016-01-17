'use strict';

angular.module('locationPics')
.directive('dropdown', function() {
  return {
    restrict: 'E',
    scope: {
      show: '=',
      title: '@'
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.toggleMenu = function() {
        scope.show = !scope.show;
      };
    },
    template: "<li class='dropdown'>"+
                "<a href='#' class='dropdown-toggle' ng-click='toggleMenu()'>{{::title}}<span class='caret'></span></a>"+
                "<ul ng-show='show' class='dropdown-menu' ng-transclude></ul>"+
              "</li>"
  };
});
