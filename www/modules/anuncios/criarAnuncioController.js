angular.module("criarAnuncio",[])
.controller("criarAnuncioController", function($state, $scope, $ionicHistory, Redirecionador, anunciosFactory, $mdBottomSheet, $cordovaImagePicker, toastFactory, popUpFactory){
	$scope.redirecionar = function (rota) {
		Redirecionador.irPara(rota);
	}

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


    $scope.salvar = function(novoAnuncio) {
        novoAnuncio.id = Math.floor(Math.random() * 1000000);
        novoAnuncio.status = 0;
        anunciosFactory.getAnunciosPorSetor(novoAnuncio);
        console.log(novoAnuncio);
    }

    $scope.confirmarAnuncio = function(novoAnuncio){

        var popUpConfirmacaoCriarAnuncio = popUpFactory.criarAnuncioConfirmacao();
        popUpConfirmacaoCriarAnuncio.then( function (resposta) {
      if(resposta) { // se apertar no OK
        //anunciosFactory.excluirAnuncio(idDoAnuncio);
        toastFactory.mostrarToastEmbaixo("Anúncio criado, aguardando aprovação!");

        $scope.salvar(novoAnuncio);
         $ionicHistory.goBack();
         $scope.meusAnunciosAguardando = anunciosFactory.getAnunciosPorStatus(2);
        //$scope.redirecionar('/menu/meus-anuncios');
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