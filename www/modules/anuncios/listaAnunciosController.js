angular.module('anuncios', [])
.controller('listaAnunciosController', function ($scope, anunciosFactory, Redirecionador, $state) {

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  if ($state.current.name === 'menu.anuncios-por-setor') {
    $scope.listaDeAnuncios = anunciosFactory.getAnunciosPorSetor();
    console.log('está listando todos')
  } else if ($state.current.name === 'menu.anuncios-filtrados'){
    console.log('filtrado');
  } else {
    console.log($state.current.name)
    console.log('foda-se')
  }


  // $scope.listaDeAnuncios = anunciosFactory.getAnunciosPorSetor();

  $scope.setores = anunciosFactory.getAllSetores();


  $scope.getAnuncio = function (id) {
    $scope.redirecionar('/menu/anuncio-detalhes/'+id);
    $scope.anuncio = anunciosFactory.getAnuncioPorId();
  }

  $scope.pesquisar = function (pesquisa) {
    pesquisa.setor = parseInt(pesquisa.setor);
    $scope.redirecionar('/menu/anuncios-por-setor/'+pesquisa.setor);
    // $scope.redirecionar('/menu/anuncios-filtrados');
    $scope.listaDeAnuncios = anunciosFactory.getAnunciosFiltrados(pesquisa);
  }

})
