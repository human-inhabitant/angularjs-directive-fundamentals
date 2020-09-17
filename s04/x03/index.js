'use strict';

(function( api ) {
  angular.module( 'app', []);

  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.person1 = {
      name: 'Luke Skywalker',
      address: {
        street: 'PO Box 123',
        city: 'Secret Rebel Base',
        planet: 'Yavin 4'
      },
      friends: [
        'Han',
        'Leia',
        'Chewbacca'
      ],
      level: 0
    }
    $scope.person2 = {
      name: 'Han Solo',
      address: {
        street: 'PO Box 123',
        city: 'Mos Eisley',
        planet: 'Tattoine'
      },
      friends: [
        'Han',
        'Leia',
        'Chewbacca'
      ],
      level: 1
    }
    $scope.droid1 = {
      name: 'R2-D2',
      specifications: {
        manufacturer: 'Industrial Automaton',
        type: 'Astromech',
        productLine: 'R2 series'
      },
      level: 1
      // owners...etc
    }
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
          elem.removeClass( classes.join( ' ' ) );
          elem.addClass( params[newVal + 1] );
        });
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'userPanel', userPanel )
  ;
  function userPanel() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'userPanel.html',
      scope: {
        name: '@',
        level: '=',
        initialCollapsed: '@collapsed'
      },
      controller: function( $scope ) {
        $scope.collapsed = ( $scope.initialCollapsed === 'true' );
        $scope.collapse = () => {
          $scope.collapsed = !$scope.collapsed;
        };
        $scope.nextState = function( evt ) {
          evt.stopPropagation();
          evt.preventDefault();
          $scope.level++;
          $scope.level = $scope.level % 4;
        };
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'personInfoCard', personInfoCard )
  ;
  function personInfoCard() {
    return {
      templateUrl: 'personInfoCard.html',
      restrict: 'E',
      scope: {
        person: '=',
        initialCollapsed: '@collapsed'
      },
      controller: function( $scope ) {
        $scope.jediMe = person => {
          person.rank = 'Jedi';
        };
        $scope.removeFriend = friend => {
          const idx = $scope.person.friends.indexOf( friend );
          if ( idx > -1 ) {
            $scope.person.friends.splice( idx, 1 );
          }
        };
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'droidInfoCard', droidInfoCard )
  ;
  function droidInfoCard() {
    return {
      templateUrl: 'droidInfoCard.html',
      restrict: 'E',
      scope: {
        droid: '=',
        initialCollapsed: '@collapsed'
      },
      controller: function( $scope ) {

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