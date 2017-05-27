angular.module("util", ['ionic'])

.factory("Redirecionador", function ($location) {

  var _irPara = function (caminho) {
    $location.path(caminho);
  }

  return {
    irPara: _irPara
  }
})
