angular.module("exemplo", []) //definição do módulo com injeção de dependência (ARRAY) vazia

/*
  controller do módulo, o que está dentro da array são 'o que aquele controller pode acessar'
  por exemplo, a factory de Redirecionar, já instanciado no módulo global APP (app.js)
 */

.controller("exemploController", exemploControllerFunction)

function exemploControllerFunction ($scope, Redirecionador, exemploFactory) {
  $scope.cor = {} // Este objeto é do formulário de cadastro de cor

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  $scope.add = function (corDoFormulario) {
    exemploFactory.cadastrar(corDoFormulario);  /* Chama a função cadastrar do exemploFactory passando como atributo a cor preenchida do formulário*/
    $scope.cor = undefined; /* Como está na mesma tela, tem que limpar o valor de $scope.cor após ser adicionado */
  }

  $scope.delete = function (indiceDaLista) {
    exemploFactory.excluir(indiceDaLista);
  }

  $scope.cores = exemploFactory.listar(); /* A listagem de cores (para mostrar na view) é o retorno da função listar do exemploFactory */
}
