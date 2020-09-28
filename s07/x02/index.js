'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.users = [
      { name: 'Luke'     , planet: 'Tatooine', job: 'Jedi'    },
      { name: 'Han'      , planet: 'Nowhere' , job: 'Jedi'    },
      { name: 'Chewbacca', planet: 'Kashyyyk', job: 'CoPilot' }
    ];
  }

  angular
    .module( 'app' )
    .factory( 'userListState', userListState )
  ;
  function userListState() {
    return {
      selectedUser: null
    };
  }

  angular
    .module( 'app' )
    .directive( 'masterUsers', masterUsers )
  ;
  function masterUsers( userListState ) {
    return {
      scope: {
        users: '=data'
      },
      templateUrl: 'masterUsers.html',
      controller: $scope => {
        $scope.state = userListState;
        userListState.selectedUser = $scope.users[0];
      }
    };
  }

  angular
    .module( 'app' )
    .directive( 'detailUsers', detailUsers )
  ;
  function detailUsers( userListState ) {
    return {
      scope: {
        users: '=data'
      },
      templateUrl: 'detailUsers.html',
      controller: $scope => {
        $scope.state = userListState;
      }
    };
  }

})( window.api || ( window.api = {} ) );