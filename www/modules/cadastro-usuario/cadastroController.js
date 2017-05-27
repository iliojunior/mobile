angular.module("cadastroUsuario", [])
  .controller('cadastroUsuarioController', function ($scope, Redirecionador, cadastroFactory) {
    $scope.redirecionar = function (rota) {
      Redirecionador.irPara(rota);
    }

    $scope.cadastrar = function (usuarioDoFormularioDeCadastro) {
      if (cadastroFactory.validarCadastro(usuarioDoFormularioDeCadastro)) {
        $scope.redirecionar('/menu/home');
      }
    }
  })
