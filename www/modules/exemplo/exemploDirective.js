angular.module("exemplo")
.directive("botaoExemplo", function () {
  /* Assim como a FACTORY, uma directive sempre retornará um OBJETO (abaixo)
     https://docs.angularjs.org/guide/directive */
  return {
    restrict: 'E',
    replace: true,
    templateUrl:  'modules/exemplo/botao-exemplo.html',
    scope: {
      btn1: "@",
      btn2: "@"
    }
  }
})
