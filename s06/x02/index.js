'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {}

  angular
    .module( 'app' )
    .directive( 'swTabStrip', swTabStrip )
  ;
  function swTabStrip() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function( $scope ) {
        $scope.panes = [];
        $scope.select = pane => {
          pane.selected = true;
          $scope.panes.forEach( curPane => {
            if ( curPane !== pane ) {
              curPane.selected = false;
            }
          });
        };
        this.addPane = pane => {
          $scope.panes.push( pane );
          if ( $scope.panes.length === 1 ) {
            pane.selected = true;
          }
        };
      },
      templateUrl: 'swTabStrip.html'
    };
  }

  angular
    .module( 'app' )
    .directive( 'swPane', swPane )
  ;
  function swPane() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        title: '@'
      },
      require: '^swTabStrip',
      link: ( scope, elem, attrs, ctrl, trans ) => {
        ctrl.addPane( scope );
      },
      templateUrl: 'swPane.html'
    };
  }
})( window.api || ( window.api = {} ) );