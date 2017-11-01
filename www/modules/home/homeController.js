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
		  	var itemLista = $scope.listaDeSetores[i]
			itemLista.imagem = null;
			getFotoDaCategoria($scope.listaDeSetores[i].idFoto)
				.then( function (response) {
					console.log($scope.listaDeSetores)
					itemLista.imagem = response;					
					// console.log($scope.listaDeSetores)
				})
		}


	})

	function getFotoDaCategoria (idFoto) {
		return anunciosFactory.getFotoDaCategoriaPorId(idFoto)
				.then(function (respostaDaFoto) {
					return respostaDaFoto;
				})
	}
  	

})
