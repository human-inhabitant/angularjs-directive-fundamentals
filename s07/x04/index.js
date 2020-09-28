'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', 'users', mainCtrl])
  ;
  function mainCtrl( $scope, users ) {
    $scope.users = users;
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
      controller: function() {
        this.collapsed = ( this.initialCollapsed === 'true' );
        this.knightMe = function( user ) {
          this.showKnightModal = true;
        };
        this.knightDialogDone = function( response ) {
          this.showKnightModal = false;
          if ( response ) {
            this.user.rank = 'Jedi Knight';
          }
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

  angular
    .module( 'app' )
    .directive( 'modal', modal )
  ;
  function modal( $document ) {
    return {
      scope: {
        modalOpen: '=open',
        options: '=',
        onClose: '&'
      },
      transclude: true,
      templateUrl: 'modal.html',
      controller: $scope => {
        $scope.close = () => {
          $scope.modalOpen = false;
          $scope.onClose();
        };
      },
      link: ( scope, elem, attrs ) => {
        const options = angular.extend({
          height: '250px',
          width: '500px',
          top: '20%',
          left: '30%'
        }, scope.options );
        const pageHeight = $document.height();
        const pageWidth = $document.width();
        elem.find( '.modal-blackout' ).css({
          width: `${pageWidth}px`,
          height: `${pageHeight}px`
        });
        elem.find( '.modal-container' ).css({
          left: options.left,
          top: options.top,
          width: `${options.width}px`,
          height: `${options.height}px`
        });
      }
    };
  }
})( window.api || ( window.api = {} ) );