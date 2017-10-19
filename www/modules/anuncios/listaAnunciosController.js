angular.module('anuncios', [])
.controller('listaAnunciosController', function ($scope, criarAnuncioFactory, anunciosFactory, Redirecionador, $state, toastFactory, popUpFactory,  $mdBottomSheet, $cordovaImagePicker, $ionicHistory) {
  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  //anuncios criados
 // $scope.todosAnuncios = anunciosFactory.getAnunciosPorSetor();
 //atualizarListagemDeAnuncios();
 $scope.meusAnunciosAtivos = {};
 $scope.meusAnunciosExpirados = {};
 $scope.meusAnunciosAguardando = {};
 $scope.setores = {};

  $scope.listaDeAnuncios = anunciosFactory.getAnunciosPorSetor(2);
  $scope.meusAnunciosAtivos = anunciosFactory.getAnunciosPorStatus(1);
  $scope.meusAnunciosExpirados = anunciosFactory.getAnunciosPorStatus(0);
  $scope.meusAnunciosAguardando = anunciosFactory.getAnunciosPorStatus(2);
  $scope.setores = anunciosFactory.getAllSetores();

  anunciosFactory.getAllSetores()
    .then( function (response) {
      $scope.setores = response;
    })
    .catch( function (error) {
      //
    })

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
    console.log($scope.meusAnunciosAguardando)
    console.log($scope.meusAnunciosAtivos)
  }


// CRIAR ANUNCIO
$scope.categorias = anunciosFactory.getAllSetores();
$scope.anuncio = {};
$scope.novoAnuncio = {};


$scope.getSubcategorias = function(categorias, categoriaSelecionada) {
  return anunciosFactory.getSubcategorias(categorias, categoriaSelecionada);
}


//editar
$scope.editarAnuncio = function (idDoAnuncio) {
  //função q redireciona pra rota
  $scope.redirecionar('/menu/criar-anuncio'+idDoAnuncio); //concatenou a rota com o ID de parametro
  $scope.anuncio = anunciosFactory.getAnuncioById(idDoAnuncio);
  anunciosFactory.editarAnuncio(idDoAnuncio);
  console.log($scope.anuncio); //pra ver o q veio nesse anuncio
  salvarEdicao();
}

$scope.salvarEdicao = function (objetoDoFormulario) {
  anunciosFactory.editarAnuncio(objetoDoFormulario);
}


$scope.confirmarAnuncio = function(novoAnuncio){

  var popUpConfirmacaoCriarAnuncio = popUpFactory.criarAnuncioConfirmacao();
  popUpConfirmacaoCriarAnuncio.then( function (resposta) {
      if(resposta) { // se apertar no OK
        //anunciosFactory.excluirAnuncio(idDoAnuncio);
        toastFactory.mostrarToastEmbaixo("Anúncio criado, aguardando aprovação!");
        novoAnuncio.id = Math.floor(Math.random() * 1000000);
        novoAnuncio.statusAnuncio = 2;
        //anunciosFactory.getAnunciosPorSetor(novoAnuncio);
        anunciosFactory.cadastrarAnuncio(novoAnuncio);
        $scope.redirecionar('/menu/meus-anuncios');
        //$ionicHistory.goBack();
        atualizarListagemDeAnuncios();  
      }else{
        toastFactory.mostrarToastEmbaixo("Cadastro de anúncio cancelado!");
        $ionicHistory.goBack();
      }
    })
}


  //IMAGEM

  $scope.initialForm = function () {
    // $scope.imageList is for store image data.
    $scope.imageList = [];
  };// End initialForm.

  // selectImage is for select image from mobile gallery
  // Parameter :  
  // limit = limit number that can select images.
  $scope.selectImage = function (limit) {
      //hide BottomSheet.
      $mdBottomSheet.hide();
      // Set options for select image from mobile gallery.
      var options = {
        maximumImagesCount: limit,
        width: 300,
        height: 300,
        quality: 100
      }; // End Set options.

      // select image by calling $cordovaImagePicker.getPictures(options)
      // Parameter :  
      // options = options of select image.
      $cordovaImagePicker.getPictures(options)

      .then(function (results) {
              // store image data to imageList.
              $scope.imageList = [];
              for (var i = 0; i < results.length; i++) {
                $scope.imageList.push(results[i]);
              }
            }, function (error) {
              console.log(error);
            });
  };// End selectImage.

  // showListBottomSheet for show BottomSheet.
  $scope.showListBottomSheet = function ($event) {
    $mdBottomSheet.show({
      templateUrl: 'image-picker-actions-template',
      targetEvent: $event,
      scope: $scope.$new(false),
    });
  }; // End showListBottomSheet.

  $scope.initialForm();
  //FIM IMAGEM

  })
