angular.module('anuncios')
.factory('anunciosFactory', function ($http) {

  var URL = "http://10.42.0.1:8081/categorias";

  /*     DADOS ESTÁTICOS     */


  var setores = [
    {id: 1, nome: 'Agrícola', imagem: 'img/setor_agricola.jpg', descricao: ' Maquinários que facilitarão o seu trabalho.', quantidade: 40},
    {id: 2, nome: 'Civil', imagem: 'img/setor_civil.jpg', descricao: ' Trabalhe com a segurança adequada.', quantidade: 10},
    {id: 3, nome: 'Industrial', imagem: 'img/setor_industrial.jpg', descricao: ' A potência em larga escala que você precisa!', quantidade: 3},
  ];

  /*
  var setores = [
    {id: 1, nome: 'Agrícola', descricao: ' Maquinários que facilitarão o seu trabalho.'},
    {id: 2, nome: 'Civil', descricao: ' Trabalhe com a segurança adequada.'},
    {id: 3, nome: 'Industrial', descricao: ' A potência em larga escala que você precisa!'},
  ];
  */
  var _anunciosPorSetor = [ // ESTÁTICO
    {id: 1, nome: 'Trator F700', id_setor: 1, imagem: 'img/anuncios/trator_1.jpg', fotos: ['img/shirt_01.png','img/shirt_02.png'], descricao: 'Trator em ótimo estado, bom para colheitas pequenas, motor poderoso e silencioso!', cidade: 'Maringá', estado: 'PR', preco: 12.50, status: 1, impulsao: 4, marca: 'Valtra', ano: 2001, cobranca: 'Por Dia'},
    {id: 2, nome: 'Caminhão VOLVO', id_setor: 2, imagem: 'img/anuncios/caminhao.jpg', fotos: ['img/shirt_01.png','img/shirt_02.png'], descricao: 'Disponibilizo meu caminhão para realizar diversas entregas, vamos negociar?', cidade: 'Maringá', estado: 'PR', preco: 89.00, status: 0, impulsao: 0, marca: 'Volvo', ano: 1997, cobranca: 'Por Dia'},
    {id: 3, nome: 'Secadora Multi-Uso', id_setor: 3, imagem: 'img/anuncios/secadora.gif', fotos: ['img/shirt_01.png','img/shirt_02.png'], descricao: 'Minha secadora de grãos está parada e preciso de dinheiro', cidade: 'Cianorte', estado: 'PR', preco: 51.50, status: 2, impulsao: 2, marca: 'Mediza', ano: 2001, cobranca: 'Por Hora'},
    {id: 4, nome: 'Colheitadeira 50-50', id_setor: 1, imagem: 'img/anuncios/colheitadeira.jpg', fotos: ['img/shirt_01.png','img/shirt_02.png'], descricao: 'Máquina perfeita para acelerar seu processo, você não pode perder!!!!', cidade: 'Curitiba', estado: 'PR', preco: 159.00, status: 2, impulsao: 0, marca: 'Massey Ferguson', ano: 2015, cobranca: 'Por Dia'},
    {id: 5, nome: 'Carriola 50Kg', id_setor: 2, imagem: 'img/anuncios/carriola.jpg', fotos: ['img/shirt_01.png','img/shirt_02.png'], descricao: 'Carriola novinha aguentando até 50kg, contato por whatsapp', cidade: 'Cianorte', estado: 'PR', preco: 27.10, status: 1, impulsao: 1, marca: 'Twenga', ano: 2017, cobranca: 'Por Hora'},
  ]

  var _tiposDeImpulsao = [
    {id: 1, nome: 'Bronze', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada semana durante 3 meses. Lista de resultados da galeria por 7 dias!', preco: 10.99, tempo: 90, cor: '#c38d4a'},
    {id: 2, nome: 'Prata', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada semana durante 3 meses. Lista de resultados da galeria por 14 dias!', preco: 16.99, tempo: 90, cor: '#b4b7b2'},
    {id: 3, nome: 'Ouro', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada 4 dias durante 5 meses. Lista de resultados da galeria por 30 dias!', preco: 21.99, tempo: 150, cor: '#e2cc2d'},
    {id: 4, nome: 'Diamante', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas todo dia durante 7 meses. Lista de resultados da galeria por 30 dias!', preco: 30.99, tempo: 210, cor: '#2de2b0'},
  ]

  var _anuncio = {id: 1, nome: 'Trator ABCD', imagem: 'img/bg_cover_01.png', cidade: 'Maringá',
                    estado: 'PR', preco: 12.50, fotos: ['img/app_icon.png','img/food_01.png'] }

  /*   FIM DADOS ESTÁTICOS     */

  var _getAllSetores = function () {
    // método HTTP
    /*
    return $http.get(URL)
      .then( function (response) {
        console.log(response.data)
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    return setores;
  };

  var _getTiposDeImpulsao = function () {
    // método HTTP
    /*
    return $http.get(URL)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    return _tiposDeImpulsao;
  };

  var _getTipoDeImpulsaoPorId = function (id) {
    // método HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _tiposDeImpulsao.length; i++) {
      if (_tiposDeImpulsao[i].id === id) {
          return _tiposDeImpulsao[i]
      }
    }
  }

  var _getAnunciosPorSetor = function (id) {
    // Método HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    return _anunciosPorSetor;
  };

  var _getAnunciosPorStatus = function (status) {
    // MÉTODO HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    var anunciosRetornados = []
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].status === status) {
        anunciosRetornados.push(_anunciosPorSetor[i])
      }
    }
    return anunciosRetornados;
  }

  var _getAnuncioPorId = function (idAnuncio) {
    // Método HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].id === parseInt(idAnuncio)) {
        return _anunciosPorSetor[i];
      }
    }
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
    /*
    return $http.delete(URL + "/" + id + "remove")
      .then( function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].id === idAnuncioRemovido) {
        _anunciosPorSetor.splice(i,1);
      }
    }
  }

  var _ativarAnuncioExpirado = function (idDoAnuncioExpirado) {
    // tem q fazer o método HTTP
    /*
    var params = {id: idDoAnuncioExpirado};
    return $http.put(urlApi + "/editar", params)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    */
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
