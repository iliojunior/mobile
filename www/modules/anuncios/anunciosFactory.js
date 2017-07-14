angular.module('anuncios')
.factory('anunciosFactory', function ($http) {

  var setores = [
    {id: 1, nome: 'Agrícola', imagem: 'img/setores/agricola.png', frase: ' Maquinários que facilitarão o seu trabalho na lavoura.', quantidade: 40},
    {id: 2, nome: 'Construção', imagem: 'img/setores/civil.png', frase: ' Trabalhe com a segurança adequada.', quantidade: 10},
    {id: 3, nome: 'Industrial', imagem: 'img/setores/industrial.png', frase: ' A potência em larga escala que você precisa!', quantidade: 3},
  ];

  var _anunciosPorSetor = [ // ESTÁTICO
    {id: 1, nome: 'Trator ABCD', id_setor: 1, imagem: 'img/anuncios/1.jpg', cidade: 'Maringá', estado: 'PR', preco: 12.50},
    {id: 2, nome: 'Caminhão EFGH', id_setor: 2, imagem: 'img/anuncios/2.jpg', cidade: 'Maringá', estado: 'PR', preco: 89.00},
    {id: 3, nome: 'Secadora IJKL', id_setor: 3, imagem: 'img/anuncios/1.jpg', cidade: 'Cianorte', estado: 'PR', preco: 51.50},
    {id: 4, nome: 'Colheitadeira MNOP', id_setor: 1, imagem: 'img/anuncios/2.jpg', cidade: 'Curitiba', estado: 'PR', preco: 159.00},
    {id: 5, nome: 'Carriola MNOP', id_setor: 2, imagem: 'img/anuncios/2.jpg', cidade: 'Cianorte', estado: 'PR', preco: 27.10},
  ]

  var _anuncio = {id: 1, nome: 'Trator ABCD', imagem: 'img/anuncios/1.jpg', cidade: 'Maringá', estado: 'PR', preco: 12.50}

  var _getAllSetores = function () {
    // método HTTP
    return setores;
  };

  var _getAnunciosPorSetor = function () {
    // Método HTTP
    return _anunciosPorSetor;
  };

  var _getAnuncioPorId = function (idAnuncio) {
    // Método HTTP
    return _anuncio;
  };

  var _getAnunciosFiltrados = function (termosDaPesquisa) {
    var arrayFiltrada = [];
    _anunciosPorSetor.filter( function (arrayAnuncios) {
      if (termosDaPesquisa.setor === arrayAnuncios.id_setor) {
        arrayFiltrada.push(arrayAnuncios)
      }
    })
    return arrayFiltrada;
    // return _anunciosPorSetor;
  }

  return {
    getAllSetores: _getAllSetores,
    getAnunciosPorSetor: _getAnunciosPorSetor,
    getAnuncioPorId: _getAnuncioPorId,
    getAnunciosFiltrados: _getAnunciosFiltrados,
  }

})
