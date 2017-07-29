angular.module('pagamento', [])
.controller('pagamentoController', function ($scope, pagamentoFactory, toastFactory, popUpFactory) {

  $scope.cartoesCadastrados = pagamentoFactory.getAllCartoes();

  $scope.cadastrarCartao = function (cartao) {
    if (pagamentoFactory.cadastrarCartao(cartao)) {
      toastFactory.mostrarToastEmbaixo('Seu cartão foi cadastrado!');
    } else {
      popUpFactory.cadastroErro()
    }
  }

  $scope.excluirCartao = function (idDoCartao) {
    var popUpConfirmacao = popUpFactory.excluirCartaoConfirmacao();
    popUpConfirmacao.then( function (resposta) {
      if(resposta) { // se apertar no OK
        pagamentoFactory.excluirCartao(idDoCartao);
        toastFactory.mostrarToastEmbaixo("Anúncio excluído!");
        // atualiza lista:
        $scope.cartoesCadastrados = pagamentoFactory.getAllCartoes();
      }
    })
  }

})
