'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.items = [4,7,18,29,57,65];
  }

  angular
    .module( 'app' )
    .directive( 'myLazyRender', myLazyRender )
  ;
  function myLazyRender() {
    return {
      restrict: 'A',
      transclude: 'element',
      priority: 1200,
      link: ( scope, elem, attrs, ctrl, trans ) => {
        let hasBeenShown = false;
        const killWatch = scope.$watch( attrs.myLazyRender, value => {
          if ( value && !hasBeenShown ) {
            hasBeenShown = true;
            trans( scope, clone => {
              elem.after( clone );
            });
            killWatch();
          }
        });
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'echo', echo )
  ;
  function echo() {
    return {
      priority: 1300,
      link: ( scope, elem, attrs, ctrl, trans ) => {
        console.info( 'Echo... echo... echo...' );
      }
    }
  }
})( window.api || ( window.api = {} ) );