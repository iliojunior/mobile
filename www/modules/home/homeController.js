angular.module("home", [])

.controller("homeController", function ($scope, Redirecionador, homeFactory) {

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  $scope.listaDeSetores = [];
  $scope.listaDeSetores = homeFactory.getAllSetores();


})
