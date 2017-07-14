angular.module("login", [])

.controller("loginController", function ($scope, Redirecionador, loginFactory, popUpFactory, $ionicPopup) {
  $scope.usuario = {};

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  $scope.logar = function (usuarioDoFormularioDeLogin) {
    // Tive que usar o <a> no html porq o button (por algum motivo) estava disparando o evento 2x
    loginFactory.validarLogin(usuarioDoFormularioDeLogin);
    $scope.redirecionar('/menu/home')
  }

  $scope.requisitarNovaSenha = function () {
    $scope.data = {}
    $scope.data.emailDeRecuperacao = '';
    $ionicPopup.show({
      title: 'Informe seu e-mail de cadastro para receber as instruções.',
      scope: $scope,
      template: "<input type='text' placeholder='seuemail@email.com' autofocus='true' ng-model='data.emailDeRecuperacao'>",
      buttons: [
        {
            text: "  Cancelar",
            type: 'ion-close button-assertive'
        },
        {
          text: "  Ok!",
          type: 'ion-checkmark-round button-balanced',
          onTap: function (e) {
            loginFactory.novaSenha($scope.data.emailDeRecuperacao);
          }
        }
      ]
    })
  }
})


// angular.module("login", [])
//
// .controller("loginController", function ($scope, Redirecionador, loginFactory, popUpFactory, $ionicPopup) {
//   $scope.redirecionar = function (rota) {
//     Redirecionador.irPara(rota);
//   }
//
//   $scope.logar = function (usuarioDoFormularioDeLogin) {
//     loginFactory.validarLogin(usuarioDoFormularioDeLogin);
//     $scope.redirecionar('/menu/home')
//   }
//
//   $scope.requisitarNovaSenha = function () {
//     $scope.data = {}
//     $scope.data.emailDeRecuperacao = '';
//     $ionicPopup.show({
//       title: 'Informe seu e-mail de cadastro para receber as instruções.',
//       scope: $scope,
//       template: "<input type='text' placeholder='seuemail@email.com' autofocus='true' ng-model='data.emailDeRecuperacao'>",
//       buttons: [
//         {
//           text: "  Ok!",
//           type: 'ion-checkmark-round button-balanced',
//           onTap: function (e) {
//             loginFactory.novaSenha($scope.data.emailDeRecuperacao);
//           }
//         },
//         {
//           text: "  Cancelar",
//           type: 'ion-close button-assertive'
//         }
//       ]
//     })
//   }
// })
