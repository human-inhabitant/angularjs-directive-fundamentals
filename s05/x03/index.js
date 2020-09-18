'use strict';

(function( api ) {
  angular.module( 'app', []);
  angular
    .module( 'app' )
    .controller( 'mainCtrl', ['$scope', mainCtrl])
  ;
  function mainCtrl( $scope ) {
    $scope.bountyHunters = [
      { name: 'Boba Fett', age: 35  },
      { name: 'IG-88',     age: 130 },
      { name: 'Dengar',    age: 42  },
      { name: 'Bossk',     age: 782 },
      { name: 'Cad Bane',  age: 51  }
    ];
    $scope.add = () => {
      $scope.bountyHunters.push({ name: '4LOM', age: 365 });
    }
    $scope.remove = () => {
      $scope.bountyHunters.length--;
    }
  }

  angular
    .module( 'app' )
    .directive( 'userList', userList )
  ;
  function userList( $compile ) {
    return {
      restrict: 'A',
      transclude: 'element',
      link: ( scope, elem, attrs, ctrl, trans ) => {
        const pieces = attrs.userList.split( ' ' );
        const itemString = pieces[0];
        const collectionName = pieces[2];
        let elements = [];
        scope.$watchCollection( collectionName, collection => {
          if ( elements.length > 0 ) {
            for ( let i = 0; i < elements.length; i++ ) {
              elements[i].elem.remove();
              elements[i].scope.$destroy();
            }
            elements = [];
          }
          for ( let i = 0; i < collection.length; i++ ) {
            const childScope = scope.$new();
            childScope[itemString] = collection[i];
            trans( childScope, clone => {
              const template = $compile( '<div class="panel panel-warning" ><div class="panel-heading">{{' + itemString + '.name}}</div><div class="panel-body" /></div>' );
              const wrapper = template( childScope );
              wrapper.find( '.panel-body' ).append( clone );
              elem.before( wrapper );
              const item = {};
              item.elem = wrapper;
              item.scope = childScope;
              elements.push( item );
            });
          }
        });
      }
    };
  }

})( window.api || ( window.api = {} ) );