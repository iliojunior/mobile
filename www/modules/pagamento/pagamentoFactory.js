angular.module('pagamento')
.factory('pagamentoFactory', function () {

  var _cartoes = [
                  {id: 1, nome: 'João A. da Silva', numero: 1112223334445556, dataExpiracao: "08/2024", codigoSeguranca: 111},
                  {id: 2, nome: 'João A. da Silva', numero: 9998887776665554, dataExpiracao: "03/2021", codigoSeguranca: 222}
                ];

  var _compra = {};

  var _compras = [];

  var _formatarUltimosNumeros = function (arrayDeCartoes) {
    var retorno = [];
    for (var i = arrayDeCartoes.length - 1; i >= 0; i--) {
      var numeroDoCartao = arrayDeCartoes[i].numero.toString();
      arrayDeCartoes[i].numero = numeroDoCartao.substr(numeroDoCartao.length - 4);
    }
    return arrayDeCartoes
  }

  var _cadastrarCartao = function (cartaoObj) {
    cartaoObj.id = _cartoes.length+1; //gambiarra pra criar ID do cartão pra usar no value do radio button na hora de selecionar o pagamento
    _cartoes.push(cartaoObj);
    return true;
  };

  var _getAllCartoes = function () {
    return _formatarUltimosNumeros(_cartoes);
  };

  var _getCartaoPorId = function (id) {
    for (var i = 0; i < _cartoes.length; i++) {
      if (_cartoes[i].id === parseInt(id)) {
        return _cartoes[i]
      }
    }
  };

  var _excluirCartao = function (idDoCartaoPraRemover) {
    for (var i = 0; i < _cartoes.length; i++) {
      if (_cartoes[i].id === parseInt(idDoCartaoPraRemover)) {
        _cartoes.splice(i,1);
      }
    }
  }

  var _setTipoImpulsaoDeAnuncio = function (idDoTipo) {
    _compra.tipoImpulsaoDeAnuncio = idDoTipo;
  }

  var _setAnuncioParaImpulsionar = function (idDoAnuncio) {
    _compra.anuncio = idDoAnuncio;
  }

  var _setMetodoPagamento = function (idDoCartao) {
    _compra.cartao = idDoCartao;
  }

  var _getCompra = function () {
    return _compra;
  }

  var _finalizarCompra = function (compra) {
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
  }

})
