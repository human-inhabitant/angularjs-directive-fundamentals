'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.openModal = () => {
      $scope.modalOpen = true;
    };
    $scope.modalClosed = response => {
      $scope.closeModal( 'no' );
    };
    $scope.closeModal = response => {
      $scope.modalOpen = false;
      console.info( 'Modal Closed:', response );
    };
  }

  angular
    .module( 'app' )
    .controller( 'modalCtrl', modalCtrl )
  ;
  function modalCtrl( $scope ) {
    $scope.close = response => {
      $scope.closeModal( response );
    }
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