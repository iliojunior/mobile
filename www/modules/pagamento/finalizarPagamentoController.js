angular.module('pagamento')
.controller('finalizarPagamentoController', function ($scope, pagamentoFactory, anunciosFactory, $location, toastFactory) {

  $scope.compra = {}

  var retornoCompra = pagamentoFactory.getCompra();
  var _pacoteComprado       = anunciosFactory.getTipoDeImpulsaoPorId(retornoCompra.tipoImpulsaoDeAnuncio);
  var _anuncioComprado      = anunciosFactory.getAnuncioPorId(retornoCompra.anuncio);
  var _cartaoComprado       = pagamentoFactory.get

  $scope.compra.nomeAnuncio = _anuncioComprado.nome;
  $scope.compra.nomePacote = _pacoteComprado.nome;
  $scope.compra.cartao = pagamentoFactory.getCartaoPorId(retornoCompra.cartao).numero;
  $scope.compra.preco = _pacoteComprado.preco;

  $scope.finalizarCompra = function (compra) {
    if (pagamentoFactory.finalizarCompra(compra)) {
      toastFactory.mostrarToastEmbaixo("Compra realizada com sucesso!");
      $location.path('/menu/meus-anuncios')
    } else {
      toastFactory.mostrarToastEmbaixo("Ops... Algo deu errado. Tente novamente mais tarde!")
    }
  }

})