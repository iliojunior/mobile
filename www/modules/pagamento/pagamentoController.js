angular.module('pagamento', [])
.controller('pagamentoController', function ($scope, pagamentoFactory, anunciosFactory, toastFactory, popUpFactory, $location, $mdBottomSheet, $ionicHistory) {

  $scope.cartoesCadastrados = pagamentoFactory.getAllCartoes();

  $scope.cadastrarCartao = function (cartao) {
    if (pagamentoFactory.cadastrarCartao(cartao)) {
      toastFactory.mostrarToastEmbaixo('Seu cartão foi cadastrado!');
      $ionicHistory.goBack();
      $scope.cartoesCadastrados = pagamentoFactory.getAllCartoes(); 
      //$location.path('/menu/listagem-cartoes');
    } else {
      popUpFactory.cadastroErro()
    }
  }

  $scope.showListBottomSheet = function ($event, IDdoCartao) {
    var cartaoDetalhes = pagamentoFactory.getCartaoPorId(IDdoCartao);
      $mdBottomSheet.show({
          templateUrl: 'detalhes-cartao',
          targetEvent: $event,
          controller: 'detalhesDoCartaoCtrl',
          locals: {
            detalhesDoCartao: cartaoDetalhes
          },
      });
  };

  $scope.excluirCartao = function (idDoCartao) {
    var popUpConfirmacao = popUpFactory.excluirCartaoConfirmacao();
    popUpConfirmacao.then( function (resposta) {
      if(resposta) { // se apertar no OK
        pagamentoFactory.excluirCartao(idDoCartao);
        toastFactory.mostrarToastEmbaixo("Cartão excluído!");
        // atualiza lista:
        $scope.cartoesCadastrados = pagamentoFactory.getAllCartoes();
      }
    })
  }

  $scope.selecionarCartao = function (idCartaoSelecionado) {
    pagamentoFactory.setMetodoPagamento(idCartaoSelecionado);
    $location.path('/menu/finalizar-pagamento');
  }

})
.controller('detalhesDoCartaoCtrl', function($scope, $mdBottomSheet, detalhesDoCartao) {
  $scope.detalhesDoCartao = detalhesDoCartao;
});