angular.module("configuracao", [])
.controller("configuracaoController", function ($scope, Redirecionador) {

	$scope.redirecionar = function (rota) {
    	Redirecionador.irPara(rota);
  	}
  	$scope.opcoes = {};
	$scope.opcoes.tourFinalizado = localStorage.getItem('tourFinalizado');
	$scope.opcoes.tourFinalizadoBoolean = $scope.opcoes.tourFinalizado == 'true'? true : false;

	$scope.mostrarTour = function () {
		if ($scope.opcoes.tourFinalizado == 'true') {
			localStorage.setItem('tourFinalizado','false');
			$scope.opcoes.tourFinalizado = 'false';
		} else {
			localStorage.setItem('tourFinalizado','true');
			$scope.opcoes.tourFinalizado = 'true';
		}
	}

})
