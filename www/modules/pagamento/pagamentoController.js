angular.module('pagamento', [])
.controller('pagamentoController', function ($scope) {

  $scope.cartoesCadastrados = [{id:0, nome: 'cartao 1', final: 1234}, {id: 1, nome: 'cartao 2', final: 9876}];

})
