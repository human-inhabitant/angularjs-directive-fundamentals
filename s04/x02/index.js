'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.answers = {allsparkLocation: 'Cybertron' }
  }

  angular
    .module( 'app' )
    .directive( 'myQuestion', myQuestion )
  ;
  function myQuestion() {
    return {
      restrict: 'E',
      transclude: true,
      templateUrl: 'myQuestion.html',
      scope: {
        questionText: '@q'
      }
    };
  }
})( window.api || ( window.api = {} ) );