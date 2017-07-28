angular.module('anuncios')
.controller('anuncioController', function ($scope, $state, anunciosFactory, $mdBottomSheet, $location) {

  $scope.anuncio = anunciosFactory.getAnuncioPorId($state.params.index);
  $scope.tiposDeImpulsao = anunciosFactory.getTiposDeImpulsao();

  $scope.showListBottomSheet = function ($event, IDtipoImpulsao) {
    var impulsaoDetalhes = anunciosFactory.getTipoDeImpulsaoPorId(IDtipoImpulsao);
      $mdBottomSheet.show({
          templateUrl: 'ui-list-bottom-sheet-template',
          // templateUrl: '/modules/anuncios/impulsionar-detalhes.html',
          targetEvent: $event,
          controller: 'ListBottomSheetCtrl',
          // scope: $scope.$new(false),
          locals: {
            detalhesDoTipoDeImpulsao: impulsaoDetalhes
          },
      });
  };

  $scope.closeListBottomSheet = function () {
      $mdBottomSheet.hide();
  }

  $scope.teste = function () {
    // alert('não faz nada ainda')
    $location.path('/menu/selecionar-pagamento-impulsao')
  }


})

.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet, detalhesDoTipoDeImpulsao) {
  $scope.detalhesDoTipoDeImpulsao = detalhesDoTipoDeImpulsao;
});
