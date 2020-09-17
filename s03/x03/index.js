'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.user1 = {
      name: 'Megatron',
      selected: false
    };
  }

  angular
    .module( 'app' )
    .directive( 'userTile', userTile )
  ;
  function userTile() {
    return {
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: 'userTile.html'
    };
  }

  angular
    .module( 'app' )
    .directive( 'userClickSelect', userClickSelect )
  ;
  function userClickSelect() {
    return {
      link: ( scope, elem, attrs ) => {
        elem.on( 'click', function() {
          scope.user.selected = !scope.user.selected;
          scope.$apply();
        });
      }
    };
  }
})( window.api || ( window.api = {} ) );