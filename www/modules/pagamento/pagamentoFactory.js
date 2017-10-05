angular.module('pagamento')
.factory('pagamentoFactory', function () {

  var URL = "http://10.42.0.1:8081/";

  var _cartoes = [
                  {id: 1, nomeTitular: 'João A. da Silva', numeroCartao: 1112223334445556, mesValidade: 11, anoValidade: 2019, idPessoa: 1},
                  {id: 2, nomeTitular: 'João A. da Silva', numeroCartao: 9998887776665554, mesValidade: 01, anoValidade: 2020, idPessoa: 1}
                ];

  var _listaMes = [01,02,03,04,05,06,07,08,09,10,11,12];
  var _listaAno = [2018,2019,2020,2021,2022,2023,2024,2025,2026,2027];

  var _compra = {};

  var _compras = [];


  var _getListaMes = function () {
    return _listaMes;
  }

  var _getListaAno = function () {
    return _listaAno;
  }

  var _formatarUltimosNumeros = function (arrayDeCartoes) {
    var retorno = [];
    for (var i = arrayDeCartoes.length - 1; i >= 0; i--) {
      var numeroDoCartao = arrayDeCartoes[i].numeroCartao.toString();
      arrayDeCartoes[i].numeroCartao = numeroDoCartao.substr(numeroDoCartao.length - 4);
    }
    return arrayDeCartoes
  }

  var _cadastrarCartao = function (cartaoObj) {
    /*
    var teste = cartaoObj.dataExpiracao.split("/");
    cartaoObj.mes = teste[0];
    cartaoObj.ano = teste[1];
    var objetoCartaoFormulario = {numeroCartao: cartaoObj.numero, mesValidade: cartaoObj.mes, anoValidade: cartaoObj.ano, nomeTitular: cartaoObj.nome}
    console.log(objetoCartaoFormulario);
    */
    cartaoObj.id = _cartoes.length+1;
    _cartoes.push(cartaoObj);

    /*
    return $http.post(URL + "cartao/", cartaoObj)
      .then(function (response) {
        //return true;
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    */

    return true;
  };

  var _getAllCartoes = function () {
    /*
    return $http.get(URL + "/")
      .then( function (response) {
        // return _formatarUltimosNumeros(response.data)
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    console.log(_cartoes)
    return _formatarUltimosNumeros(_cartoes.filter(filtrarCartoesGambiarraEstatico));
    //return _formatarUltimosNumeros(_cartoes);
  };

  var filtrarCartoesGambiarraEstatico = function (_cartoes) {
    return _cartoes.idPessoa == 1;
  }

  var _getCartaoPorId = function (id) {
    /*
    return $http.get(URL + "cartao/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _cartoes.length; i++) {
      if (_cartoes[i].id === parseInt(id)) {
        return _cartoes[i]
      }
    }
  };

  var _excluirCartao = function (idDoCartaoPraRemover) {
    /*
    return $http.delete(URL + "/" + idDoCartaoPraRemover)
      .then( function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _cartoes.length; i++) {
      if (_cartoes[i].id === parseInt(idDoCartaoPraRemover)) {
        _cartoes.splice(i,1);
      }
    }
  }

  var _setTipoImpulsaoDeAnuncio = function (idDoTipo) {
    /*
    return $http.put(URL + "/editar", idDoTipo)
      .then(function (response) {
        //return true;
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    */
    _compra.tipoImpulsaoDeAnuncio = idDoTipo;
  }

  var _setAnuncioParaImpulsionar = function (idDoAnuncio) {
    /*
    return $http.put(URL + "/editar", idDoAnuncio)
      .then(function (response) {
        //return true;
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    */
    _compra.anuncio = idDoAnuncio;
  }

  var _setMetodoPagamento = function (idDoCartao) {
    /*
    return $http.put(URL + "/editar", idDoCartao)
      .then(function (response) {
        //return true;
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    */
    _compra.cartao = idDoCartao;
  }

  var _getCompra = function () {
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        // return _formatarUltimosNumeros(response.data)
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    return _compra;
  }

  var _finalizarCompra = function (compra) {
    /*
    return $http.post(Api + "/editar", compra)
      .then(function (response) {
        //return true;
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    */
    if (_compras.push(compra)) {  // se a compra deu certo
      return true;
    } else {
      return false;
    }
  }

  return {
    formatarUltimosNumeros: _formatarUltimosNumeros,
    cadastrarCartao: _cadastrarCartao,
    getAllCartoes: _getAllCartoes,
    getCartaoPorId: _getCartaoPorId,
    excluirCartao: _excluirCartao,
    setTipoImpulsaoDeAnuncio: _setTipoImpulsaoDeAnuncio,
    setAnuncioParaImpulsionar: _setAnuncioParaImpulsionar,
    setMetodoPagamento: _setMetodoPagamento,
    getCompra: _getCompra,
    finalizarCompra: _finalizarCompra,
    getListaAno: _getListaAno,
    getListaMes: _getListaMes,
  }

})
