'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.user = {
      name: 'Megatron',
      address: {
        planet: 'Cybertron'
      },
      friends: [
        'Starscream',
        'Soundwave',
        'Shockwave'
      ]
    };
  }
  angular
    .module( 'app' )
    .directive( 'userInfoCard', userInfoCard )
  ;
  function userInfoCard() {
    return {
      templateUrl: 'userInfoCard.html',
      restrict: 'E'
    };
  }

})( window.api || ( window.api = {} ) );