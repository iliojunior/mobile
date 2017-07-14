angular.module('util')
.factory('popUpFactory', function ($ionicPopup) {

  var _pedirEmailDeAlteracaoDeSenha = function () {
    $scope.email = undefined;

    $ionicPopup.show({
      title: 'Informe seu e-mail de cadastro para receber as instruções.',
      template: "<input type='text' placeholder='seuemail@email.com' ng-model='email'>",
      buttons: [
        {
          text: "  Ok!",
          type: 'ion-checkmark-round button-balanced',
          onTap: function (e) {
            console.log($scope.email)
          }
        },
        {
          text: "  Cancelar",
          type: 'ion-close button-assertive'
        }
      ]
    })
  }

  var _cadastroSucesso = function () {
    return $ionicPopup.alert({
     title: 'Bem Vindo!',
     template: 'Seu cadastro foi realizado com sucesso! Você será redirecionado...',
     okText: '  OK',
     okType: 'button-balanced ion-checkmark-round'
   });
  }

  var _cadastroErro = function () {
    $ionicPopup.alert({
     title: 'Ops!',
     template: 'Cadastro Inválido! Verifique suas informações.',
     okText: '  Entendi',
     okType: 'button-assertive ion-close-round'

   });
  }

  return {
    pedirEmailDeAlteracaoDeSenha: _pedirEmailDeAlteracaoDeSenha,
    cadastroSucesso: _cadastroSucesso,
    cadastroErro: _cadastroErro,
  }

})
