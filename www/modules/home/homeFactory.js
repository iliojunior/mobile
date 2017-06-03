angular.module('home')
.factory('homeFactory', function () {

  var setores = [
    {id: 1, nome: 'Agrícola', imagem: 'img/setores/agricola.png'},
    {id: 2, nome: 'Civil', imagem: 'img/setores/civil.png'},
    // {id: 3, nome: 'Industrial', imagem: 'img/setores/industrial.png'},
  ];

  var anunciosPorSetor = [
    {id: 1, nome: 'Trator ABCD', imagem: 'img/anuncios/1.jpg', cidade: 'Maringá', estado: 'PR', preco: 12.50},
    {id: 2, nome: 'Trator EFGH', imagem: 'img/anuncios/2.jpg', cidade: 'Maringá', estado: 'PR', preco: 89.00},
    {id: 1, nome: 'Trator ABCD', imagem: 'img/anuncios/1.jpg', cidade: 'Maringá', estado: 'PR', preco: 12.50},
    {id: 2, nome: 'Trator EFGH', imagem: 'img/anuncios/2.jpg', cidade: 'Maringá', estado: 'PR', preco: 89.00},
  ]

  var _getAllSetores = function () {
    // método HTTP
    return setores;
  };

  var _getAnunciosPorSetor = function () {
    // método HTTP
    return anunciosPorSetor;
  };

  return {
    getAllSetores: _getAllSetores,
    getAnunciosPorSetor: _getAnunciosPorSetor,
  }

})
