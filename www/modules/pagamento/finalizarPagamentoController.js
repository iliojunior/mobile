angular.module('pagamento')
.controller('finalizarPagamentoController', function ($scope, pagamentoFactory, anunciosFactory, $location, toastFactory) {

  $scope.compra = {}

  var retornoCompra = pagamentoFactory.getCompra();
  var _pacoteComprado       = anunciosFactory.getTipoDeImpulsaoPorId(retornoCompra.tipoImpulsaoDeAnuncio);
  var _anuncioComprado      = anunciosFactory.getAnuncioPorId(retornoCompra.anuncio);
  
  $scope.compra.nomeAnuncio = _anuncioComprado.titulo;
  $scope.compra.nomePacote = _pacoteComprado.nome;
  //$scope.compra.cartao = pagamentoFactory.getCartaoPorId(retornoCompra.cartao).numeroCartao;
  //console.log(pagamentoFactory.getCartaoPorId(retornoCompra.cartao))
  $scope.compra.valor = _pacoteComprado.valor;

  pagamentoFactory.getCartaoPorId(retornoCompra.cartao)
    .then( function (response) {
      $scope.compra.cartao = response.numeroCartao;
    })
    .catch( function (error) {
      $scope.cartoesCadastrados = null;
      // console.log(error)
  }) 


  $scope.finalizarCompra = function (compra) {
    if (pagamentoFactory.finalizarCompra(compra)) {
      toastFactory.mostrarToastEmbaixo("Compra realizada com sucesso!");
      //$location.path('/menu/meus-anuncios')
      $location.path('/menu/meus-anuncios')
    } else {
      toastFactory.mostrarToastEmbaixo("Ops... Algo deu errado. Tente novamente mais tarde!")
    }
  }

})