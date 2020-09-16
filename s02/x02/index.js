'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {}

  angular.module( 'app' ).directive( 'inherited1', function() {
    return {
      scope: true,
      link: scope => {
        console.info( 'inherited1', scope );
      }
    };
  });
  angular.module( 'app' ).directive( 'inherited2', function() {
    return {
      scope: true,
      link: scope => {
        console.info( 'inherited2', scope );
      }
    };
  });
})( window.api || ( window.api = {} ) );