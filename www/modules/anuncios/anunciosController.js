angular.module('anuncios', [])
.controller('anunciosController', function ($scope, homeFactory) {

  $scope.anuncios = [];
  $scope.anuncios = homeFactory.getAnunciosPorSetor();


})
