'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.size = 150;
  }

  angular
    .module( 'app' )
    .directive( 'fontScale', fontScale )
  ;
  function fontScale() {
    return {
      restrict: 'A',
      link: ( scope, elem, attrs ) => {
        scope.$watch( attrs['fontScale'], newVal => {
          elem.css( 'font-size', `${newVal}%`)
        });
      }
    };
  }

})( window.api || ( window.api = {} ) );