angular.module('pagamento')
.factory('pagamentoFactory', function () {

  var _cartoes = [
                  {id: 1, nome: 'cartao 1', numero: 111222333444555666, dataExpiracao: "08/2024", codigoSeguranca: 000},
                  {id: 2, nome: 'cartao 2', numero: 999888777666555444, dataExpiracao: "03/2021", codigoSeguranca: 111}
                ];

  var _cadastrarCartao = function (cartaoObj) {
    _cartoes.push(cartaoObj);
    return true;
  };

  var _getAllCartoes = function () {
    return _cartoes
  };

  var _excluirCartao = function (idDoCartaoPraRemover) {
    for (var i = 0; i < _cartoes.length; i++) {
      if (_cartoes[i].id === idDoCartaoPraRemover) {
        _cartoes.splice(i,1);
      }
    }
  }

  return {
    cadastrarCartao: _cadastrarCartao,
    getAllCartoes: _getAllCartoes,
    excluirCartao: _excluirCartao,
  }

})
