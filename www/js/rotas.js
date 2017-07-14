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
    templateUrl: 'modules/login/login.html',
    controller: 'loginController'
  })


  .state('/cadastro-usuario', {
    url: '/cadastro-usuario',
    templateUrl: 'modules/cadastro-usuario/cadastro-usuario.html',
    controller: 'cadastroUsuarioController'
  })
  //
  // .state('/perfil-usuario', {
  //   url: '/perfil-usuario',
  //   templateUrl: 'modules/perfil-usuario/perfil.html',
  //   controller: 'perfilUsuarioController'
  // })
  //
  .state('menu', {
    url: '/menu',
    abstract: true,       /* Não pode ser instanciada (não pode acessar diretamente)*/
    templateUrl: 'modules/home/menu.html',
    controller: 'menuController'
  })

  .state('menu.home', {         /* Na hora de chamar a rota é: /menu/home   */
    url: '/home',
    params: {
      isAnimated: false
    },
    views: {
      'menuContent': {
        templateUrl: 'modules/home/home.html',
        controller: 'homeController'
      }
    },
  })

  .state('menu.anuncios-por-setor', {         /* Na hora de chamar a rota é: /menu/home   */
    // url: '/lista-anuncios-por-setor/:index',
    url: '/anuncios-por-setor/:index',
    params: {
      isAnimated: false
    },
    views: {
      'menuContent': {
        templateUrl: 'modules/anuncios/anuncios-por-setor.html',
        controller: 'listaAnunciosController'
      }
    },
  })

  .state('menu.anuncio-detalhes', {         /* Na hora de chamar a rota é: /menu/home   */
    // url: '/lista-anuncios-por-setor/:index',
    url: '/anuncio-detalhes/:index',
    params: {
      isAnimated: false
    },
    views: {
      'menuContent': {
        templateUrl: 'modules/anuncios/anuncio-detalhes.html',
        controller: 'listaAnunciosController'
      }
    },
  })

  .state('menu.busca', {         /* Na hora de chamar a rota é: /menu/home   */
    // url: '/lista-anuncios-por-setor/:index',
    url: '/busca',
    params: {
      isAnimated: false
    },
    views: {
      'menuContent': {
        templateUrl: 'modules/anuncios/anuncios-busca.html',
        // controller: 'anunciosFiltradosController'
        controller: 'listaAnunciosController'
      }
    },
  })

  .state('menu.anuncios-filtrados', {         /* Na hora de chamar a rota é: /menu/home   */
    // url: '/lista-anuncios-por-setor/:index',
    url: '/anuncios-filtrados',
    params: {
      isAnimated: false,
    },
    views: {
      'menuContent': {
        templateUrl: 'modules/anuncios/anuncios-filtrados.html',
        // controller: 'anunciosFiltradosController'
        controller: 'listaAnunciosController'
      }
    },
  })

});
