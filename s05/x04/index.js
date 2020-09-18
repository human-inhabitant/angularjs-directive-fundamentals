'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {

  }

  angular
    .module( 'app' )
    .directive( 'simpleDirective', simpleDirective )
  ;
  function simpleDirective() {
    return {
      restrict: 'E',
      compile: ( elem, attrs ) => {
        // Do work before
        return ( scope, attrs, elem, ctrl, trans ) => {
          // Link function...
        };
      }
    };
  }
})( window.api || ( window.api = {} ) );