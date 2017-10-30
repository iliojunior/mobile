angular.module('loadingModule', [])
.factory('loadingFactory', function ($ionicLoading) {

  var _show = function (myHTML) {
    $ionicLoading.show({
       template: myHTML,
     });
  }

  var _hide = function () {
    $ionicLoading.hide();
  }

  var _showNoTextLoading = function () {
    var myHTML = '<ion-spinner class="spinner-positive" icon="dots"></ion-spinner>';
    _show(myHTML);
  }

  var _showDefaultLoading = function () {
    var myHTML = '<ion-spinner class="spinner-assertive" icon="spiral"></ion-spinner>'+'\n'
                +'<h4>Carregando...</h4>';
    $ionicLoading.show({
       template: myHTML,
       //duration: 5000,
     });
  }


  return {
    show: _show,
    hide: _hide,
    showDefaultLoading: _showDefaultLoading,
    showNoTextLoading: _showNoTextLoading
  }

})