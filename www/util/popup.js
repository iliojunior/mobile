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

  return {
    pedirEmailDeAlteracaoDeSenha: _pedirEmailDeAlteracaoDeSenha,
  }

})
