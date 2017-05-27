angular.module('cadastroUsuario')
.factory('cadastroFactory', function () {

    var _validarCadastro = function (usuarioDoFormularioDeCadastro) {
      if (usuarioDoFormularioDeCadastro.senha === usuarioDoFormularioDeCadastro.senha2) {
        alert("Seja Wellcome!");
        return true;
      } else {
        alert("Atenção: Senhas diferentes!");
        return false;
      }
    }

    return {
      validarCadastro: _validarCadastro
    }

})
