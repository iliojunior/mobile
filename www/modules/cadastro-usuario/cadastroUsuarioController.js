angular.module("cadastroUsuario", [])
  .controller('cadastroUsuarioController', function ($scope, Redirecionador, cadastroFactory, popUpFactory) {
    $scope.mostrarSenha = false;

    $scope.redirecionar = function (rota) {
      Redirecionador.irPara(rota);
    }

    $scope.mostrarEsconderSenha = function () {
      alert('2');
      var camposenha1 = document.getElementById("senha");
      var camposenha2 = document.getElementById("senhaConfirmada");
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
      alert('3');
      if (cadastroFactory.validarCadastro(usuarioDoFormularioDeCadastro)) {
        popUpFactory.cadastroSucesso().then( function (resposta) {
          $scope.redirecionar('/menu/home');
        })
      } else {
        popUpFactory.cadastroErro();
      }
    }
  })
