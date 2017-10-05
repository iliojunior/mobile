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
  // O CÓDIGO DE CIMA FICARÁ ASSIM (EMBAIXO):
  /*
    anunciosFactory.getAnunciosPorSetor()
      .then( function (response) {
        $scope.listaDeAnuncios = response;
      })
      .catch( function (error) {
        //
      })  
    anunciosFactory.getAnunciosPorStatus(1)
      .then( function (response) {
        $scope.meusAnunciosAtivos = response;
      })
      .catch( function (error) {
        //
      })  
    anunciosFactory.getAnunciosPorStatus(0)
      .then( function (response) {
        $scope.meusAnunciosExpirados = response;
      })
      .catch( function (error) {
        //
      }) 
    anunciosFactory.getAnunciosPorStatus(2)
      .then( function (response) {
        $scope.meusAnunciosAguardando = response;
      })
      .catch( function (error) {
        //
      })

    anunciosFactory.getAllSetores()
      .then( function (response) {
        $scope.setores = response;
      })
      .catch( function (error) {
        //
      })
  */

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
        atualizarListagemDeAnuncios();
      }
    })
  }

  $scope.ativarAnuncio = function (idDoAnuncioExpirado) {
    var popUpConfirmacao = popUpFactory.confirmarAtivacaoDeAnuncioExpirado();
    popUpConfirmacao.then( function (resposta) {
      if (resposta) {
          anunciosFactory.ativarAnuncioExpirado(idDoAnuncioExpirado);
          toastFactory.mostrarToastEmbaixo("Seu anúncio foi enviado para avaliação!");
          atualizarListagemDeAnuncios();        
      }
    })
  }

  function atualizarListagemDeAnuncios () { 
    $scope.meusAnunciosAtivos = anunciosFactory.getAnunciosPorStatus(1);
    $scope.meusAnunciosExpirados = anunciosFactory.getAnunciosPorStatus(0);
    $scope.meusAnunciosAguardando = anunciosFactory.getAnunciosPorStatus(2);
  }

})
