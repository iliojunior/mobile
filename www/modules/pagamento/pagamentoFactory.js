angular.module('pagamento')
.factory('pagamentoFactory', function () {

  var _cartoes = [
                  {id: 1, nome: 'João A. da Silva', numero: 1112223334445556, dataExpiracao: "08/2024", codigoSeguranca: 111},
                  {id: 2, nome: 'João A. da Silva', numero: 9998887776665554, dataExpiracao: "03/2021", codigoSeguranca: 222}
                ];

  var _ultimosQuatroDigitos = function (todosOsDigitosDoCartao) {
    return todosOsDigitosDoCartao.substr(todosOsDigitosDoCartao.length - 4);
  }

  var _cadastrarCartao = function (cartaoObj) {
    _cartoes.push(cartaoObj);
    return true;
  };

  var _getAllCartoes = function () {
    return _cartoes
  };

  var _getCartaoPorId = function (id) {
    for (var i = 0; i < _cartoes.length; i++) {
      if (_cartoes[i].id === id) {
        return _cartoes[i]
      }
    }
  };

  var _excluirCartao = function (idDoCartaoPraRemover) {
    for (var i = 0; i < _cartoes.length; i++) {
      if (_cartoes[i].id === idDoCartaoPraRemover) {
        _cartoes.splice(i,1);
      }
    }
  }

  return {
    ultimosQuatroDigitos: _ultimosQuatroDigitos,
    cadastrarCartao: _cadastrarCartao,
    getAllCartoes: _getAllCartoes,
    getCartaoPorId: _getCartaoPorId,
    excluirCartao: _excluirCartao,
  }

})
