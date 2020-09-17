'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.messages = [];
    $scope.handlePause = function( e ) {
      $scope.messages.push({ text: 'paused!' });
      console.info( e );
    };
  }

  angular
    .module( 'app' )
    .directive( 'eventPause', eventPause )
  ;
  function eventPause( $parse ) {
    return {
      restrict: 'A',
      link: ( scope, element, attrs ) => {
        const fn = $parse(attrs['eventPause']);
        element.on( 'pause', function( evt ) {
          scope.$apply( () => {
            fn( scope, { evt: evt });
          });
        });
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'spacebarSupport', spacebarSupport )
  ;
  function spacebarSupport() {
    return {
      restrict: 'A',
      link: ( scope, element, attrs ) => {
        $( 'body' ).on( 'keypress', function( evt ) {
          const vidEl = element[0];
          if ( evt.key === 32 ) {
            if ( vidEl.paused ) {
              vidEl.play();
            } else {
              vidEl.pause();
            }
          }
        });
      }
    };
  }
})( window.api || ( window.api = {} ) );