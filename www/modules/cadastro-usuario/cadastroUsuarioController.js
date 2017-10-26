angular.module("cadastroUsuario", [])
  .controller('cadastroUsuarioController', function ($scope, Redirecionador, cadastroUsuarioFactory, popUpFactory) {
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
      /*if (cadastroUsuarioFactory.validarCadastro(usuarioDoFormularioDeCadastro)) {
        $scope.formCadastroUsuario.$setPristine();
        $scope.usuario = {};
        $scope.mostrarSenha = false;
        popUpFactory.cadastroSucesso().then( function (resposta) {
          $scope.redirecionar('/menu/home');
        })
      } else {
        popUpFactory.cadastroErro();
      }*/
      var pessoaObjeto = {     // teve q fazer novo objeto para não enviar informação a mais (senha)
        tipoPessoa: usuarioDoFormularioDeCadastro.tipoPessoa,
        nome: usuarioDoFormularioDeCadastro.nome,
        email: usuarioDoFormularioDeCadastro.email
      }
      if (usuarioDoFormularioDeCadastro.tipoPessoa === "fisica") {
        _cadastrarPessoaFisica(pessoaObjeto, usuarioDoFormularioDeCadastro.senha)
      } else {
        _cadastrarPessoaJuridica(pessoaObjeto, usuarioDoFormularioDeCadastro.senha)
      }
    }

    var _cadastrarPessoaFisica = function (objetoDaPessoaFisica, senha) {
      cadastroUsuarioFactory.cadastrarPessoaFisica(objetoDaPessoaFisica)
        .then( function (response) {
          var usuarioObjeto = {
            email: objetoDaPessoaFisica.email,
            senha: senha,
            idPessoa: response.idGerado
          }
          _limparFormulario();
          localStorage.setItem("tipoPessoa",objetoDaPessoaFisica.tipoPessoa)
          _cadastrarUsuario(usuarioObjeto);
        })
        .catch( function (error) {    // catch se não conseguir cadastrar na classe PESSOA
          console.log(error);
          popUpFactory.cadastroErro();
        })
    }

    var _cadastrarPessoaJuridica = function (objetoDaPessoaJuridica, senha) {
      console.log("pj: ", objetoDaPessoaJuridica)
      cadastroUsuarioFactory.cadastrarPessoaJuridica(objetoDaPessoaJuridica)
        .then( function (response) {
          console.log("resposta pj: ", response)
          var usuarioObjeto = {
            email: objetoDaPessoaJuridica.email,
            senha: senha,
            idPessoa: response.idGerado
          }
          _limparFormulario();
          localStorage.setItem("tipoPessoa",objetoDaPessoaFisica.tipoPessoa)
          _cadastrarUsuario(usuarioObjeto);
        })
        .catch( function (error) {    // catch se não conseguir cadastrar na classe PESSOA
          console.log(error);
          popUpFactory.cadastroErro();
        })
    }

    var _cadastrarUsuario = function (usuarioObjeto) {
      cadastroUsuarioFactory.cadastrarUsuario(usuarioObjeto)
        .then( function (responseCadastroUsuario) {
          if(responseCadastroUsuario.data) {
            popUpFactory.cadastroSucesso().then( function (resposta) {
              $scope.redirecionar('/menu/home');
            })
          } else {
            popUpFactory.cadastroErro();
          }          
        })
        .catch( function (error) {
          popUpFactory.cadastroErro();
        })
    }

    var _limparFormulario = function () {
      $scope.formCadastroUsuario.$setPristine();
      $scope.usuario = {};
      $scope.mostrarSenha = false;
    }

  })
