angular.module('pagamento', [])
.controller('pagamentoController', function ($scope, pagamentoFactory, toastFactory, popUpFactory, $location, $mdBottomSheet) {

  $scope.cartoesCadastrados = pagamentoFactory.getAllCartoes();
  formatarUltimosNumeros();


  function formatarUltimosNumeros () {
    for (var i = $scope.cartoesCadastrados.length - 1; i >= 0; i--) {
      $scope.cartoesCadastrados[i].numero = pagamentoFactory.ultimosQuatroDigitos($scope.cartoesCadastrados[i].numero.toString())
    }
  }


  $scope.cadastrarCartao = function (cartao) {
    if (pagamentoFactory.cadastrarCartao(cartao)) {
      toastFactory.mostrarToastEmbaixo('Seu cartão foi cadastrado!');
      setTimeout( function () {
        //Redirecionador.irPara(rota)
        console.log('kkkk')        
        
      }, 2000)
      $location.path('/menu/listagem-cartoes');
    } else {
      popUpFactory.cadastroErro()
    }
  }

  $scope.showListBottomSheet = function ($event, IDdoCartao) {
    var cartaoDetalhes = pagamentoFactory.getCartaoPorId(IDdoCartao);
    //console.log(cartaoDetalhes)
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



})
.controller('detalhesDoCartaoCtrl', function($scope, $mdBottomSheet, detalhesDoCartao) {
  $scope.detalhesDoCartao = detalhesDoCartao;
});