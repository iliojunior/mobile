angular.module('login')
.factory('loginFactory', function () {

  var _validarEmail = function (email) {
    var regularExpression = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (regularExpression.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  var _validarLogin = function (usuarioDoFormularioDeLogin) {
    console.log("A função 'validarLogin' ainda não faz nada");
  };

  var _deslogar = function (usuarioDoFormularioDeLogin) {
    console.log("A função 'deslogar' ainda não faz nada");
  };

  var _novaSenha = function (emailDeRecuperacao) {
    console.log(emailDeRecuperacao)
  }

  return {
    validarEmail: _validarEmail,
    validarLogin: _validarLogin,
    deslogar: _deslogar,
    novaSenha: _novaSenha,
  }

})
