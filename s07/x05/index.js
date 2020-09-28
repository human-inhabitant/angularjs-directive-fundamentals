'use strict';

(function( api ) {
  angular.module( 'app', ['ngAnimate', 'ui.bootstrap']);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', 'users', mainCtrl])
  ;
  function mainCtrl( $scope, users ) {
    $scope.users = users;
  }

  angular
      .module( 'app' )
      .controller( 'knightConfirmationCtrl', ['$scope', '$uibModalInstance', 'user', knightConfirmationCtrl])
  ;
  function knightConfirmationCtrl( $scope, $uibModalInstance, user ) {
    $scope.user = user;
    $scope.yes = function() {
      $uibModalInstance.close();
    };
    $scope.no = function() {
      $uibModalInstance.dismiss();
    };
  }

  angular
    .module( 'app' )
    .directive( 'userInfoCard', userInfoCard )
  ;
  function userInfoCard( users ) {
    return {
      restrict: 'E',
      templateUrl: 'userInfoCard.html',
      scope: {
        user: '=',
        initialCollapsed: '@collapsed'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function( $uibModal ) {
        const that = this;
        this.collapsed = ( this.initialCollapsed === 'true' );
        this.knightMe = function( user ) {
          const modalInstance = $uibModal.open({
            animation: this.animationsEnabled,
            templateUrl: 'knightConfirmation.html',
            controller: 'knightConfirmationCtrl',
            resolve: {
              user: function() {
                return that.user;
              }
            }
          });
          modalInstance.result.then( answer => {
            if ( answer ) {
              that.user.rank = 'Jedi Knight';
            }
          });

        };
        this.collapse = function() {
          this.collapsed = !this.collapsed;
        };
        this.removeFriend = function( friend ) {
          const that = this;

          const idx = this.user.likes.indexOf( friend );
          if ( idx > -1 ) {
            this.user.likes.splice( idx, 1 );
            users.forEach( function( user ) {
              if ( user.id === friend.id ) {
                let foundLike;
                user.likedBy.forEach( function( like ) {
                  if ( like.id === that.user.id ) {
                    foundLike = like;
                    return false;
                  }
                });
                const likedByIdx = user.likedBy.indexOf( foundLike );
                if ( likedByIdx > -1 ) {
                  user.likedBy.splice( likedByIdx, 1 );
                }
                return false;
              }
            });
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
        }
        $scope.cancelRemove = () => {
          $scope.removing = false;
        }
        $scope.confirmRemove = () => {
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
      scope: true,
      templateUrl: 'address.html',
      controller: $scope => {
        $scope.collapsed = false;
        $scope.collapseAddress = () => {
          $scope.collapsed = true;
        }
        $scope.expandAddress = () => {
          $scope.collapsed = false;
        }
      }
    };
  }

})( window.api || ( window.api = {} ) );