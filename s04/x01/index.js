'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.message = 'This is a message...';
    console.info( 'controller', $scope );
  }

  angular
    .module( 'app' )
    .controller( 'innerCtrl', innerCtrl )
  ;
  function innerCtrl( $scope ) {
    console.info( 'inner controller', $scope );
  }

  angular
    .module( 'app' )
    .directive( 'displayBox', displayBox )
  ;
  function displayBox() {
    return {
      restrict: 'E',
      templateUrl: 'displayBox.html',
      controller: $scope => {
        $scope.hidden = false;
        $scope.close = () => {
          $scope.hidden = true;
        };
        $scope.message = 'I am hijacking you...';
        console.info( 'directive', $scope );
      },
      transclude: true,
      scope: true
    };
  }
})( window.api || ( window.api = {} ) );