angular.module("home", [])
.controller("homeController", function ($scope, Redirecionador, anunciosFactory, tourFactory) {

	$scope.redirecionar = function (rota) {
    	Redirecionador.irPara(rota);
  	}

	$scope.listaDeSetores = [];
  	$scope.listaDeSetores = anunciosFactory.getAllSetores();

  	/*
	anunciosFactory.getAllSetores().then( function (response) {
		$scope.listaDeSetores = response;
	})
	*/
  	

})
