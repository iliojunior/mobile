angular.module("cadastroUsuario", [])
  .controller('cadastroUsuarioController', function ($scope, Redirecionador, cadastroFactory, popUpFactory) {
    $scope.usuario = {};
    $scope.mostrarSenha = false;

    $scope.redirecionar = function (rota) {
      Redirecionador.irPara(rota);
    }

    $scope.mostrarEsconderSenha = function () {
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
      if (cadastroFactory.validarCadastro(usuarioDoFormularioDeCadastro)) {
        $scope.formCadastroUsuario.$setPristine();
        $scope.usuario = {};
        $scope.mostrarSenha = false;
        // document.getElementById("checkBoxMostrarSenha").classList.remove('md-checked');
        popUpFactory.cadastroSucesso().then( function (resposta) {
          $scope.redirecionar('/menu/home');
        })
      } else {
        popUpFactory.cadastroErro();
      }
    }
  })
