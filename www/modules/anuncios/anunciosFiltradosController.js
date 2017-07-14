angular.module('anuncios')
.controller('anunciosFiltradosController', function ($scope, anunciosFactory, Redirecionador, $state) {

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  console.log($state.current.params.pesquisa);

  // $scope.setores = anunciosFactory.getAllSetores();
  //
  // $scope.pesquisar = function (pesquisa) {
  //   pesquisa.setor = parseInt(pesquisa.setor);
  //   $scope.redirecionar('/menu/anuncios-filtrados');
  //   // $state.go('/menu/anuncios-filtrados',{pesquisa: pesquisa});
  //   $scope.listaDeAnuncios = anunciosFactory.getAnunciosFiltrados(pesquisa);
  //   // console.log($scope.listaDeAnuncios)
  // }

})
