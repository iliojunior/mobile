angular.module("index", [])
.controller("indexController", function ($scope, Redirecionador) {

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }
})
