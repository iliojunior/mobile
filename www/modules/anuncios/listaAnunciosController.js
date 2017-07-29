angular.module('anuncios', [])
.controller('listaAnunciosController', function ($scope, anunciosFactory, Redirecionador, $state, toastFactory, popUpFactory) {

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  $scope.listaDeAnuncios = anunciosFactory.getAnunciosPorSetor();
  $scope.meusAnunciosAtivos = anunciosFactory.getAnunciosPorStatus(1);
  $scope.meusAnunciosExpirados = anunciosFactory.getAnunciosPorStatus(0);
  $scope.meusAnunciosAguardando = anunciosFactory.getAnunciosPorStatus(2);

  $scope.setores = anunciosFactory.getAllSetores();

  $scope.pesquisar = function (pesquisa) {
    pesquisa.setor = parseInt(pesquisa.setor);
    alert('Você pesquisou por: \n Texto: '+pesquisa.texto+'\n Num. Setor: '+pesquisa.setor+'\n Filtro 1: '+pesquisa.filtro1+'\n Filtro 2: '+pesquisa.filtro2+'\n (Esse alerta n vai existir)')
    $scope.redirecionar('/menu/anuncios-por-setor/'+pesquisa.setor);
  }

  $scope.excluirAnuncio = function (idDoAnuncio) {
    var popUpConfirmacao = popUpFactory.excluirAnuncioConfirmacao();
    popUpConfirmacao.then( function (resposta) {
      if(resposta) { // se apertar no OK
        anunciosFactory.excluirAnuncio(idDoAnuncio);
        toastFactory.mostrarToastEmbaixo("Anúncio excluído!");
        // atualiza lista:
        $scope.meusAnunciosExpirados = anunciosFactory.getMeusAnunciosExpirados(1);
        $scope.meusAnunciosAtivos = anunciosFactory.getMeusAnunciosAtivos(1);
      }
    })
  }

  $scope.ativarAnuncio = function (idDoAnuncioExpirado) {
    anunciosFactory.ativarAnuncioExpirado(idDoAnuncioExpirado);
    toastFactory.mostrarToastEmbaixo("Seu anúncio foi reativado!");
    // atualiza lista;
    $scope.meusAnunciosExpirados = anunciosFactory.getMeusAnunciosExpirados(1);
    $scope.meusAnunciosAtivos = anunciosFactory.getMeusAnunciosAtivos(1);
  }

})
