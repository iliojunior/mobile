angular.module("home", [])
.controller("homeController", function ($scope, Redirecionador, anunciosFactory, tourFactory, homeFactory) {

	$scope.redirecionar = function (rota) {
    	Redirecionador.irPara(rota);
  	}

	$scope.listaDeSetores = [];
	$scope.isLoadingPhoto = false;

	anunciosFactory.getAllSetores().then( function (response) {
		$scope.listaDeSetores = response;
		$scope.isLoadingPhoto = true;
		for (var i = 0; i < $scope.listaDeSetores.length; i++) {
			anunciosFactory.getFotoDaCategoriaPorId($scope.listaDeSetores[i].idFoto)
				.then(function (respostaDaFoto) {
					$scope.listaDeSetores[0].imagem = respostaDaFoto;
					$scope.isLoadingPhoto = false;
				})
		}
	})
  	

})
