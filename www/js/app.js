/*        ATENÇÃO:
  O módulo APP é o módulo global do projetos, todos os itens dependentes (na array de injeção de dependência) são os módulos usados
*/
angular.module('app', ['ionic', 'exemplo', 'util', 'index', 'login', "home", 'cadastroUsuario', 'perfilUsuario'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
