angular.module('util')
.controller('toastController', function ($scope, displayOption, toastFactory) {

  $scope.displayOption = displayOption;

})

.factory('toastFactory', function ($mdToast) {

  var _gambiarraMostrarToastUmaVezRecuperarSenha = false;
  /* Esta variavel é por um bug do tema que realiza a funçao 2x no evento de qlqer elemento BUTTON
     q não tem o type='button'. Não é possível colocar este type no botão do popUp, por isso fiz a gambiarra
  */

  var _mostrarToastEmbaixo = function (mensagem) {
    $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 1000,
            position: 'bottom',
            locals: {
                displayOption: {
                    title: mensagem
                }
            }
        });
  }

  var _mostrarToastAcima = function (mensagem) {
    $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 1000,
            position: 'top',
            locals: {
                displayOption: {
                    title: mensagem
                }
            }
        });
  }

  var _mostrarToastRecuperarSenha = function (mensagem) {

    $mdToast.show({
              controller: 'toastController',
              templateUrl: 'toast.html',
              hideDelay: 1000,
              position: 'top',
              locals: {
                  displayOption: {
                      title: mensagem
                  }
              }
          });
    /*
    if (!_gambiarraMostrarToastUmaVezRecuperarSenha) {
      _gambiarraMostrarToastUmaVezRecuperarSenha = true;  //seta variavel para true para poder mostrar o toast
    } else {
      $mdToast.show({
              controller: 'toastController',
              templateUrl: 'toast.html',
              hideDelay: 1000,
              position: 'top',
              locals: {
                  displayOption: {
                      title: mensagem
                  }
              }
          });
      _gambiarraMostrarToastUmaVezRecuperarSenha = false; //seta variavel para false para não mostrar o toast
    }
    */


  }

  var _mostrarToastEmailInvalido = function (mensagem) {
    if (!_gambiarraMostrarToastUmaVezRecuperarSenha) {
      _gambiarraMostrarToastUmaVezRecuperarSenha = true;  //seta variavel para true para poder mostrar o toast
    } else {
      $mdToast.show({
              controller: 'toastController',
              templateUrl: 'toast.html',
              hideDelay: 1000,
              position: 'top',
              locals: {
                  displayOption: {
                      title: mensagem
                  }
              }
          });
      _gambiarraMostrarToastUmaVezRecuperarSenha = false; //seta variavel para false para não mostrar o toast
    }
  }


  return {
        mostrarToastEmbaixo: _mostrarToastEmbaixo,
        mostrarToastAcima: _mostrarToastAcima,
        mostrarToastRecuperarSenha: _mostrarToastRecuperarSenha,
        mostrarToastEmailInvalido: _mostrarToastEmailInvalido,
    }

})
