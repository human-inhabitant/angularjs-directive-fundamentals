'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.data = { message: 'I have not been clicked...' };
    $scope.clickHandler = function( p ) {
      p.message = 'I have been clicked...';
    }
  }

  angular
    .module( 'app' )
    .directive( 'myClick', myClick )
  ;
  function myClick( $parse ) {
    return {
      link: ( scope, element, attrs) => {
        const fn = $parse( attrs['myClick'] );
        element.on( 'click', function() {
          scope.$apply(function() {
            fn( scope );
          });
        });
      }
    };
  }
})( window.api || ( window.api = {} ) );