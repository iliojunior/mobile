angular.module("home", [])
.controller("homeController", function ($scope, Redirecionador, anunciosFactory, tourFactory) {

	$scope.redirecionar = function (rota) {
    	Redirecionador.irPara(rota);
  	}

	$scope.listaDeSetores = [];
  	//$scope.listaDeSetores = anunciosFactory.getAllSetores();

	anunciosFactory.getAllSetores().then( function (response) {
		$scope.listaDeSetores = response;
		for (var i = 0; i < $scope.listaDeSetores.length; i++) {
			anunciosFactory.getFotoDaCategoriaPorId($scope.listaDeSetores[i].idFoto)
				.then(function (respostaDaFoto) {
					console.log("resposta controller: ",respostaDaFoto)
					$scope.listaDeSetores[0].imagem = respostaDaFoto
				})
		}
		/*anunciosFactory.getFotoDaCategoriaPorId($scope.listaDeSetores[0].idFoto)
				.then(function (respostaDaFoto) {
					console.log("resposta controller: ",respostaDaFoto)
					$scope.listaDeSetores[0].imagem = respostaDaFoto
				})*/
	})
  	

})
