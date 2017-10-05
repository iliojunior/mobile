angular.module('pagamento')
.controller('finalizarPagamentoController', function ($scope, pagamentoFactory, anunciosFactory, $location, toastFactory) {

  $scope.compra = {}

  var retornoCompra = pagamentoFactory.getCompra();
  var _pacoteComprado       = anunciosFactory.getTipoDeImpulsaoPorId(retornoCompra.tipoImpulsaoDeAnuncio);
  var _anuncioComprado      = anunciosFactory.getAnuncioPorId(retornoCompra.anuncio);
  
  $scope.compra.nomeAnuncio = _anuncioComprado.titulo;
  $scope.compra.nomePacote = _pacoteComprado.nome;
  $scope.compra.cartao = pagamentoFactory.getCartaoPorId(retornoCompra.cartao).numeroCartao;
  console.log(_pacoteComprado)
  $scope.compra.valor = _pacoteComprado.valor;

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