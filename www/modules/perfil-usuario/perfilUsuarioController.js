angular.module("perfilUsuario", [])
.controller('perfilUsuarioController', function($scope, Redirecionador){

  $scope.redirecionar = function(rota){
    Redirecionador.irPara(rota);
  }

  setInterval (function () {
    console.log($scope.tipoPessoa)
  },2000)


})
