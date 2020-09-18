'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.items = [4,7,18,29,57,65]
  }

  angular
    .module( 'app' )
    .directive( 'myTransclude', myTransclude )
  ;
  function myTransclude() {
    return {
      restrict: 'A',
      transclude: 'element',
      link: ( scope, elem, attrs, ctrl, trans ) => {
        trans( scope, clone => {
          elem.after( clone );
        });
      }
    }
  }

})( window.api || ( window.api = {} ) );