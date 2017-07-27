angular.module('anuncios')
.factory('anunciosFactory', function ($http) {

  var setores = [
    {id: 1, nome: 'Agrícola', imagem: 'img/setores/agricola.png', frase: ' Maquinários que facilitarão o seu trabalho na lavoura.', quantidade: 40},
    {id: 2, nome: 'Construção', imagem: 'img/setores/civil.png', frase: ' Trabalhe com a segurança adequada.', quantidade: 10},
    {id: 3, nome: 'Industrial', imagem: 'img/setores/industrial.png', frase: ' A potência em larga escala que você precisa!', quantidade: 3},
  ];

  var _anunciosPorSetor = [ // ESTÁTICO
    {id: 1, nome: 'Trator ABCD', id_setor: 1, imagem: 'img/bg_cover_01.png', cidade: 'Maringá', estado: 'PR', preco: 12.50, status: 1},
    {id: 2, nome: 'Caminhão EFGH', id_setor: 2, imagem: 'img/bg_cover_01.png', cidade: 'Maringá', estado: 'PR', preco: 89.00, status: 0},
    {id: 3, nome: 'Secadora IJKL', id_setor: 3, imagem: 'img/bg_cover_01.png', cidade: 'Cianorte', estado: 'PR', preco: 51.50, status: 2},
    {id: 4, nome: 'Colheitadeira MNOP', id_setor: 1, imagem: 'img/bg_cover_01.png', cidade: 'Curitiba', estado: 'PR', preco: 159.00, status: 2},
    {id: 5, nome: 'Carriola MNOP', id_setor: 2, imagem: 'img/bg_cover_01.png', cidade: 'Cianorte', estado: 'PR', preco: 27.10, status: 1},
  ]

  var _tiposDeImpulsao = [
    {id: 1, nome: 'Bronze', descricao: 'Com o pacote bronze, seu anúncio ficará no topo das pesquisas por 7 dias!', preco: 4.99, tempo: 7, cor: '#c38d4a'},
    {id: 2, nome: 'Prata', descricao: 'Quer atingir novos clientes? O pacote prata vai te ajudar!', preco: 9.99, tempo: 15, cor: '#b4b7b2'},
    {id: 3, nome: 'Ouro', descricao: 'Com o pacote ouro, o número de visualizações do seu anúncio vai triplicar!', preco: 14.99, tempo: 30, cor: '#e2cc2d'},
    {id: 4, nome: 'Diamante', descricao: 'Turbine as visualizações do seu anúncio com o pacote diamante!', preco: 19.99, tempo: 90, cor: '#2de2b0'},
  ]

  var _anuncio = {id: 1, nome: 'Trator ABCD', imagem: 'img/bg_cover_01.png', cidade: 'Maringá', estado: 'PR', preco: 12.50}

  var _getAllSetores = function () {
    // método HTTP
    return setores;
  };

  var _getTiposDeImpulsao = function () {
    // método HTTP
    return _tiposDeImpulsao;
  };

  var _getTipoDeImpulsaoPorId = function (id) {
    // método HTTP
    for (var i = 0; i < _tiposDeImpulsao.length; i++) {
      if (_tiposDeImpulsao[i].id === id) {
          return _tiposDeImpulsao[i]
      }
    }
  }

  var _getAnunciosPorSetor = function () {
    // Método HTTP
    return _anunciosPorSetor;
  };

  var _getAnunciosPorStatus = function (status) {
    var anunciosRetornados = []
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].status === status) {
        anunciosRetornados.push(_anunciosPorSetor[i])
      }
    }
    return anunciosRetornados;
  }

  var _getAnuncioPorId = function (idAnuncio) {
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].id === parseInt(idAnuncio)) {
        return _anunciosPorSetor[i];
      }
    }
    // Método HTTP
    // return _anuncio;
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

  var _excluirAnuncio = function (idAnuncioRemovido) {
    //método HTTP
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].id === idAnuncioRemovido) {
        _anunciosPorSetor.splice(i,1);
      }
    }
  }

  var _ativarAnuncioExpirado = function (idDoAnuncioExpirado) {
    // tem q fazer o método HTTP
    var anuncioPraAtivar = _getAnuncioPorId(idDoAnuncioExpirado);
    anuncioPraAtivar.status = 1;
  }

  return {
    getAllSetores: _getAllSetores,
    getAnunciosPorSetor: _getAnunciosPorSetor,
    getAnunciosPorStatus: _getAnunciosPorStatus,
    getAnuncioPorId: _getAnuncioPorId,
    getAnunciosFiltrados: _getAnunciosFiltrados,
    getTiposDeImpulsao: _getTiposDeImpulsao,
    getTipoDeImpulsaoPorId: _getTipoDeImpulsaoPorId,
    ativarAnuncioExpirado: _ativarAnuncioExpirado,
    excluirAnuncio: _excluirAnuncio,
  }

})
