angular.module("home", [])

.controller("homeController", function ($scope, Redirecionador, anunciosFactory) {

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  $scope.listaDeSetores = [];
  $scope.listaDeSetores = anunciosFactory.getAllSetores();


})
