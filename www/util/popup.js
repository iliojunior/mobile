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
     template: 'Seu cadastro foi realizado com sucesso! Você será redirecionado.',
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

  var _novaSenhaEnviada = function () {
    return $ionicPopup.alert({
     title: 'Nova Senha',
     template: 'Um e-mail será enviado com sua nova senha!',
     okText: '  OK',
     okType: 'button-balanced ion-checkmark-round'
   });
  }

  var _excluirAnuncioConfirmacao = function () {
      return $ionicPopup.confirm({
        title: 'Excluir anúncio',
        template: 'Você tem certeza que quer excluir este anúncio? A operação não poderá ser desfeita.',
        okText: ' Excluir',
        okType: 'ion-checkmark-round button-balanced',
        cancelText: ' Cancelar', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'ion-close button-assertive'
      });
  }

  var _excluirCartaoConfirmacao = function () {
      return $ionicPopup.confirm({
        title: 'Excluir cartão de crédito',
        template: 'Você tem certeza que quer excluir este cartão? A operação não poderá ser desfeita.',
        okText: ' Excluir',
        okType: 'ion-checkmark-round button-balanced',
        cancelText: ' Cancelar', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'ion-close button-assertive'
      });
  }

  var _confirmarAtivacaoDeAnuncioExpirado = function () {
      return $ionicPopup.confirm({
        title: 'Ativar anúncio expirado',
        template: 'Você tem certeza que quer ativar este anúncio? Ele será re-enviado para avaliação.',
        okText: ' OK',
        okType: 'ion-checkmark-round button-balanced',
        cancelText: ' Cancelar', // String (default: 'Cancel'). The text of the Cancel button.
        cancelType: 'ion-close button-assertive'
      });
  }

  return {
    pedirEmailDeAlteracaoDeSenha: _pedirEmailDeAlteracaoDeSenha,
    cadastroSucesso: _cadastroSucesso,
    cadastroErro: _cadastroErro,
    novaSenhaEnviada: _novaSenhaEnviada,
    excluirAnuncioConfirmacao: _excluirAnuncioConfirmacao,
    excluirCartaoConfirmacao: _excluirCartaoConfirmacao,
    confirmarAtivacaoDeAnuncioExpirado: _confirmarAtivacaoDeAnuncioExpirado,
  }

})
