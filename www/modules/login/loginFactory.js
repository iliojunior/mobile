angular.module('login')
.factory('loginFactory', function () {
    var _validarLogin = function (usuarioDoFormularioDeLogin) {
      alert("SUCESSO! BEM VINDO!");
    };

    var _novaSenha = function (emailDeRecuperacao) {
      alert("As intruções foram enviadas para o seu e-mail");
    };

    return {
      validarLogin: _validarLogin,
      novaSenha: _novaSenha
    }

})
