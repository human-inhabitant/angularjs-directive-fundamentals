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
      ],
      level: 0
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
      ],
      level: 1
    };
  }

  angular
    .module( 'app' )
    .directive( 'stateDisplay', stateDisplay )
  ;
  function stateDisplay() {
    return {
      link: ( scope, elem, attrs ) => {
        const params = attrs['stateDisplay'].split( ' ' );
        const lnk = params[0];
        const classes = params.slice( 1 );

        scope.$watch( lnk, newVal => {
          elem.attr( 'class', params[newVal + 1] );

        });
      }
    };
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
        user: '=',
        initialCollapsed: '@collapsed'
      },
      controller: function( $scope ) {
        $scope.collapsed = ( $scope.initialCollapsed === 'true' );
        $scope.knightMe = user => {
          user.rank = 'knight';
        };
        $scope.collapse = () => {
          $scope.collapsed = !$scope.collapsed;
        };
        $scope.removeFriend = friend => {
          const idx = $scope.user.friends.indexOf( friend );
          if ( idx > -1 ) {
            $scope.user.friends.splice( idx, 1 );
          }
        };
        $scope.nextState = function() {
          $scope.user.level++;
          $scope.user.level = $scope.user.level % 4;
        };
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'removeFriend', removeFriend )
  ;
  function removeFriend() {
    return {
      restrict: 'E',
      templateUrl: 'removeFriend.html',
      scope: {
        notifyParent: '&method'
      },
      controller: $scope => {
        $scope.removing = false;
        $scope.startRemove = () => {
          $scope.removing = true;
        };
        $scope.cancelRemove = () => {
          $scope.removing = false;
        };
        $scope.confirmRemove = function() {
          $scope.notifyParent();
        }
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'address', address )
  ;
  function address() {
    return {
      restrict: 'E',
      templateUrl: 'address.html',
      scope: true,
      controller: function( $scope ) {
        $scope.collapsed = false;
        $scope.collapseAddress = () => {
          $scope.collapsed = true;
        };
        $scope.expandAddress = () => {
          $scope.collapsed = false;
        };
      }
    }
  }

})( window.api || ( window.api = {} ) );