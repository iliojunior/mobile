angular.module('login')
.factory('loginFactory', function () {
    var _validarLogin = function (usuarioDoFormularioDeLogin) {
      console.log("não faz nada ainda");
      // alert("SUCESSO! BEM VINDO!");
    };

    var _novaSenha = function (emailDeRecuperacao) {
      alert("As intruções foram enviadas para o seu e-mail");
    };

    return {
      validarLogin: _validarLogin,
      novaSenha: _novaSenha
    }

})
