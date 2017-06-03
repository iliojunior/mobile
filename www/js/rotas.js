angular.module('app')

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  .state('/exemplo', {
    url: '/exemplo',
    templateUrl: 'modules/exemplo/exemplo.html',
    controller: 'exemploController'
  })

  .state('/', {
    url: '/',
    templateUrl: 'modules/index/index.html',
    controller: 'indexController'
  })

  .state('/login', {
    url: '/login',
    templateUrl: 'modules/login/login.html',
    controller: 'loginController'
  })

  .state('/cadastro-usuario', {
    url: '/cadastro-usuario',
    templateUrl: 'modules/cadastro-usuario/cadastro.html',
    controller: 'cadastroUsuarioController'
  })

  .state('menu', {
    url: '/menu',
    abstract: true,       /* Não pode ser instanciada (não pode acessar diretamente)*/
    templateUrl: 'modules/home/menu.html',
  })

  .state('menu.home', {         /* Na hora de chamar a rota é: /menu/home   */
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'modules/home/home.html'
      }
    },
    controller: 'homeController'
  })

  .state('menu.lista-anuncios-por-setor', {         /* Na hora de chamar a rota é: /menu/home   */
    url: '/lista-anuncios-por-setor/:index',
    views: {
      'menuContent': {
        templateUrl: 'modules/anuncios/lista-anuncios-por-setor.html'
      }
    },
    controller: 'anunciosController'
  })


/*________________________________________________________________________________________________________________________*/

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
      }
    }
  });

});
