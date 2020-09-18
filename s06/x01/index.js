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
    .directive( 'emperor', function() {
      const name = 'The Emperor';
      return {
        scope: true,
        controller: function( $scope ) {
          this.name = name;
        },
        link: ( scope, elem, attrs, ctrl, trans ) => {
          elem.data( 'name', name );
        }
      };
    })
  ;

  angular
    .module( 'app' )
    .directive( 'vader', function() {
      const name = 'Vader';
      return {
        scope: true,
        require: '^emperor',
        controller: function( $scope ) {
          this.name = name;
        },
        link: ( scope, elem, attrs, ctrl, trans ) => {
          elem.data( 'name', name );
          elem.data( 'master', ctrl.name );
          console.info( 'Vader\'s master is:', ctrl.name );
        }
      };
    })
  ;

  angular
    .module( 'app' )
    .directive( 'starKiller', function() {
      return {
        scope: true,
        require: '^vader',
        link: ( scope, elem, attrs, ctrl, trans ) => {
          elem.data( 'name', 'StarKiller' );
          elem.data( 'master', ctrl.name );
          console.info('StarKiller\'s master is:', ctrl.name );
        }
      };
    })
  ;
})( window.api || ( window.api = {} ) );