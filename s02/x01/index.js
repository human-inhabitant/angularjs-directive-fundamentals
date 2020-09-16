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
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496"
        },
        planet: 'Cybertron'
      },
      friends: [
        'Starscream',
        'Soundwave',
        'Shockwave'
      ]
    };
    $scope.user2 = {
      name: 'Starscream',
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618"
        },
        planet: 'Cybertron'
      },
      friends: [
        'Megatron',
        'Soundwave',
        'Shockwave'
      ]
    };
    console.info( $scope );
  }

  angular
    .module( 'app' )
    .directive( 'userInfoCard', userInfoCard )
  ;
  function userInfoCard() {
    return {
      templateUrl: 'userInfoCard.html',
      restrict: 'E',
      scope: {
        user: '='
      },
      controller: function( $scope ) {
        $scope.knightMe = user => {
          user.rank = 'knight';
        };
        console.info( $scope );
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'myDirective', myDirective )
  ;
  function myDirective() {
    return {
      scope: {}
    };
  }

})( window.api || ( window.api = {} ) );