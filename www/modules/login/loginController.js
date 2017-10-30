angular.module("login", [])

.controller("loginController", function ($scope, Redirecionador, loginFactory, popUpFactory, $ionicPopup, toastFactory, loadingFactory) {
  $scope.usuario = {};

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }


  $scope.logar = function (usuarioDoFormularioDeLogin) {
    loadingFactory.showDefaultLoading()
    loginFactory.validarLogin(usuarioDoFormularioDeLogin)
      .then( function (response) {
        loadingFactory.hide();
        if (response) { // response é o idPessoa daquele login e senha
          loginFactory.logarUsuario(response);
          $scope.usuario = {};
          $scope.redirecionar('/menu/home');
          toastFactory.mostrarToastEmbaixo('Seja Bem vindo!');
        } else {
          toastFactory.mostrarToastEmbaixo('Login ou senha inválidos!');
        }
      })
      .catch( function (error) {
        loadingFactory.hide();
      })
    
  }

  $scope.deslogar = function () {
    loginFactory.deslogar();
    $scope.redirecionar('/');
    toastFactory.mostrarToastEmbaixo('Você decidiu sair do sistema.');
  }

  $scope.requisitarNovaSenha = function () {
    $scope.data = {}
    $scope.data.emailDeRecuperacao = '';
    $ionicPopup.show({
      title: 'Informe seu e-mail de cadastro para receber as instruções.',
      scope: $scope,
      template: "<form name='recuperarSenhaForm'>"+
                "<input ng-minlength='5' type='text' placeholder='seuemail@email.com' autofocus='true' name='emailDeRecuperacao' ng-model='data.emailDeRecuperacao' id='inputRecuperarSenha' ng-pattern='/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/' required>"+
                "<div ng-messages='recuperarSenhaForm.emailDeRecuperacao.$error' style='margin-top: 10px'>"+
                "<span style='color: #f22' ng-message='pattern'>E-mail fornecido é inválido.</span>"+
                "<span style='color: #f22' ng-message='required'>Campo obrigatório</span>"+
                "</div></form>",
      buttons: [
        {
            text: "  Cancelar",
            type: 'ion-close button-assertive'
        },
        {
          text: "  Ok!",
          type: 'ion-checkmark-round button-balanced',
          onTap: function (e) {
            var inputEmailRecuperarSenha = document.getElementById('inputRecuperarSenha')
            if (!$scope.data.emailDeRecuperacao) {  //não foi preenchido
              e.preventDefault(); // botão OK fica bloquiado (não faz nada), só o cancelar funciona
              // inputEmailRecuperarSenha.style.border = "3px solid #f00";
              // toastFactory.mostrarToastEmailInvalido('Preencha o e-mail!')
            } else {  // campo preenchido
              if (loginFactory.validarEmail($scope.data.emailDeRecuperacao)) {
                loginFactory.novaSenha($scope.data.emailDeRecuperacao);
                toastFactory.mostrarToastRecuperarSenha('As intruções foram enviadas para o seu e-mail!');
              } else {
                  e.preventDefault(); // tem q preencher o campo
                  toastFactory.mostrarToastEmailInvalido('E-mail inválido!')
              }
            }
          }
        }
      ]
    })

  }
})
