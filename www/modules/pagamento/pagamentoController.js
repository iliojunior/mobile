angular.module('pagamento', [])
.controller('pagamentoController', function ($scope, pagamentoFactory, anunciosFactory, toastFactory, popUpFactory, $location, $mdBottomSheet, $ionicHistory) {

  //$scope.cartoesCadastrados = pagamentoFactory.getAllCartoes();
 
  pagamentoFactory.getAllCartoes(localStorage.getItem("idPessoa"))
    .then( function (response) {
      $scope.cartoesCadastrados = response;
    })
    .catch( function (error) {
      $scope.cartoesCadastrados = null;
  })  

  $scope.listaMes = pagamentoFactory.getListaMes();
  $scope.listaAno = pagamentoFactory.getListaAno();


  $scope.cadastrarCartao = function (cartao) {
    cartao.idPessoa = localStorage.getItem("idPessoa");
    cartao.mesValidade = parseInt(cartao.mesValidade);
    cartao.anoValidade = parseInt(cartao.anoValidade);
    cartao.numeroCartao = parseInt(cartao.numeroCartao);
    pagamentoFactory.cadastrarCartao(cartao).then(function (response) {
      if (response) {
        toastFactory.mostrarToastEmbaixo('Seu cartão foi cadastrado!');
        pagamentoFactory.getAllCartoes(localStorage.getItem("idPessoa")).then(function (response) {
          $scope.cartoesCadastrados = response;
          $location.path('/menu/listagem-cartoes');
        })
      } else {
        popUpFactory.cadastroErro()
      }
    })
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
        /*pagamentoFactory.excluirCartao(idDoCartao);
        toastFactory.mostrarToastEmbaixo("Cartão excluído!");
        // atualiza lista:
        //$scope.cartoesCadastrados = pagamentoFactory.getAllCartoes(localStorage.getItem("idPessoa"));
        pagamentoFactory.getAllCartoes(localStorage.getItem("idPessoa")).then(function (response) {
          console.log(response);
          $scope.cartoesCadastrados = response;
        })*/
        // //////////////////
        pagamentoFactory.excluirCartao(idDoCartao).then( function (response) {
          toastFactory.mostrarToastEmbaixo("Cartão excluído!");
          pagamentoFactory.getAllCartoes(localStorage.getItem("idPessoa")).then(function (response) {
            console.log(response);
            $scope.cartoesCadastrados = response;
          })
        })
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