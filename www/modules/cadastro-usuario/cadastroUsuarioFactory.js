angular.module('cadastroUsuario')
.factory('cadastroUsuarioFactory', function () {

    var _validarCadastro = function (usuarioDoFormularioDeCadastro) {
      if (usuarioDoFormularioDeCadastro.senha === usuarioDoFormularioDeCadastro.senhaConfirmada) {
        return true;
      } else {
        return false;
      }
    }

    return {
      validarCadastro: _validarCadastro
    }

})
