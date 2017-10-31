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
		var arrayDeFotos = [];
		for (var i = 0; i < $scope.listaDeSetores.length; i++) {
			/*anunciosFactory.getFotoDaCategoriaPorId($scope.listaDeSetores[i].idFoto)
				.then(function (respostaDaFoto) {
					$scope.listaDeSetores[0].imagem = respostaDaFoto;
					$scope.isLoadingPhoto = false;
				})*/
			//===============================
			$scope.listaDeSetores[i].imagem = null;
			getFotoDaCategoria($scope.listaDeSetores[i].idFoto)
				.then( function (response) {
					console.log("resposta: ",response);
					//$scope.listaDeSetores[i].imagem = response;
					arrayDeFotos.push(response);
				})
		}

		for (var i = 0; i > $scope.listaDeSetores.length; i++) {
			$scope.listaDeSetores[i].imagem = arrayDeFotos[i];
			console.log($scope.listaDeSetores[i].imagem)
		}

	})

	function getFotoDaCategoria (idFoto) {
		return anunciosFactory.getFotoDaCategoriaPorId(idFoto)
				.then(function (respostaDaFoto) {
					return respostaDaFoto;
				})
	}
  	

})
