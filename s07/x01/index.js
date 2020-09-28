'use strict';

(function( api ) {
  angular.module( 'app', []);

  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.user1 = {
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
      hasForce: true,
      yearsOfJediTraining: 4,
      master: 'Yoda',
      passedTrials: true,
      masterApproves: true
    };
    $scope.user2 = {
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
      ]
    };
  }

  angular
    .module( 'app' )
    .factory( 'jediPolicy', jediPolicy )
  ;
  function jediPolicy( $q ) {
    return {
      advanceToKnight: function( candidate ) {
        const promise = $q( ( resolve, reject ) => {
          if ( candidate.hasForce
            && (
              candidate.yearsOfJediTraining > 20
              || candidate.isChosenOne
              || ( candidate.master === 'Yoda' && candidate.yearsOfJediTraining > 3 )
            )
            && candidate.masterApproves
            && candidate.passedTrials ) {
            candidate.rank = 'Jedi Knight';
            resolve( candidate );
          } else {
            reject( candidate );
          }
        });
        return promise;
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'userInfoCard', userInfoCard )
  ;
  function userInfoCard( jediPolicy ) {
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
          jediPolicy.advanceToKnight( user ).then( null, user => {
            alert( `Sorry, ${user.name} in not ready to become a Jedi Knight...` );
          });
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