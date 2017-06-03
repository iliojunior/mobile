angular.module("cadastroUsuario", [])
  .controller('cadastroUsuarioController', function ($scope, Redirecionador, cadastroFactory) {
    $scope.mostrarSenha = false;

    $scope.redirecionar = function (rota) {
      Redirecionador.irPara(rota);
    }

    $scope.mostrarEsconderSenha = function () {
      var camposenha1 = document.getElementById("senha1");
      var camposenha2 = document.getElementById("senha2");
      if (!$scope.mostrarSenha) {
        $scope.mostrarSenha = true;
        camposenha1.type = "text";
        camposenha2.type = "text";
      } else {
        $scope.mostrarSenha = false;
        camposenha1.type = "password";
        camposenha2.type = "password";
      }
    }

    $scope.cadastrar = function (usuarioDoFormularioDeCadastro) {
      if (cadastroFactory.validarCadastro(usuarioDoFormularioDeCadastro)) {
        $scope.redirecionar('/menu/home');
      }
    }
  })
