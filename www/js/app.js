window.globalVariable = {
    //custom color style variable
    color: {
        // appPrimaryColor: "#0099ff",
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    },// End custom color style variable
    startPage: {
        url: "/app/dashboard",//Url of start page.
        state: "app.dashboard"//State name of start page.
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    },
    oAuth: {
      dropbox: "your_api_key",//Use for Dropbox API clientID.
      facebook: "your_api_key",//Use for Facebook API appID.
      foursquare: "your_api_key", //Use for Foursquare API clientID.
      instagram: "your_api_key",//Use for Instagram API clientID.
      googlePlus: "your_api_key",//Use for Google API clientID.
    },
    adMob: "your_api_key" //Use for AdMob API clientID.
};// End Global variable

/*        ATENÇÃO:
  O módulo APP é o módulo global do projetos, todos os itens dependentes (na array de injeção de dependência) são os módulos usados
*/
angular.module('app', ['ionic','ngIOS9UIWebViewPatch', 'ngMaterial', 'ngMessages', 'ngCordova', 'nzTour',
                      'exemplo', 'util', 'login', 'home', 'cadastroUsuario', 'anuncios', 'pagamento',
                      'configuracao'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {

  if (localStorage.getItem('tourFinalizado') === null) {
    localStorage.setItem('tourFinalizado','false') /* Tem que ser em STRING pq o localStorage só armazena string*/
  }

  // Create custom defaultStyle.
  function getDefaultStyle() {
      return "" +
          ".material-background-nav-bar { " +
          "   background-color        : " + appPrimaryColor + " !important; " +
          "   border-style            : none;" +
          "}" +
          ".md-primary-color {" +
          "   color                     : " + appPrimaryColor + " !important;" +
          "}";
  }// End create custom defaultStyle

  // Create custom style for product view.
  function getProductStyle() {
      return "" +
          ".material-background-nav-bar { " +
          "   background-color        : " + appPrimaryColor + " !important;" +
          "   border-style            : none;" +
          "   background-image        : url('img/background_cover_pixels.png') !important;" +
          "   background-size         : initial !important;" +
          "}" +
          ".md-primary-color {" +
          "   color                     : " + appPrimaryColor + " !important;" +
          "}";
  }// End create custom style for product view.

  // Create custom style for contract us view.
  function getContractUsStyle() {
      return "" +
          ".material-background-nav-bar { " +
          "   background-color        : transparent !important;" +
          "   border-style            : none;" +
          "   background-image        : none !important;" +
          "   background-position-y   : 4px !important;" +
          "   background-size         : initial !important;" +
          "}" +
          ".md-primary-color {" +
          "   color                     : " + appPrimaryColor + " !important;" +
          "}";
  } // End create custom style for contract us view.

  // Create custom style for Social Network view.
  function getSocialNetworkStyle(socialColor) {
      return "" +
          ".material-background-nav-bar {" +
          "   background              : " + socialColor + " !important;" +
          "   border-style            : none;" +
          "} " +
          "md-ink-bar {" +
          "   color                   : " + socialColor + " !important;" +
          "   background              : " + socialColor + " !important;" +
          "}" +
          "md-tab-item {" +
          "   color                   : " + socialColor + " !important;" +
          "}" +
          " md-progress-circular.md-warn .md-inner .md-left .md-half-circle {" +
          "   border-left-color       : " + socialColor + " !important;" +
          "}" +
          " md-progress-circular.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
          "    border-top-color       : " + socialColor + " !important;" +
          "}" +
          " md-progress-circular.md-warn .md-inner .md-gap {" +
          "   border-top-color        : " + socialColor + " !important;" +
          "   border-bottom-color     : " + socialColor + " !important;" +
          "}" +
          "md-progress-circular.md-warn .md-inner .md-right .md-half-circle {" +
          "  border-right-color       : " + socialColor + " !important;" +
          " }" +
          ".spinner-android {" +
          "   stroke                  : " + socialColor + " !important;" +
          "}" +
          ".md-primary-color {" +
          "   color                   : " + socialColor + " !important;" +
          "}" +
          "a.md-button.md-primary, .md-button.md-primary {" +
          "   color                   : " + socialColor + " !important;" +
          "}";
  }// End create custom style for Social Network view.


  function initialRootScope() {
      $rootScope.appPrimaryColor = appPrimaryColor;// Add value of appPrimaryColor to rootScope for use it to base color.
      $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
      $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
      };


  function hideActionControl() {
      //For android if user tap hardware back button, Action and Dialog should be hide.
      $mdBottomSheet.cancel();
      $mdDialog.cancel();
  };


  // createCustomStyle will change a style of view while view changing.
  // Parameter :
  // stateName = name of state that going to change for add style of that page.
  function createCustomStyle(stateName) {
    // console.log(appPrimaryColor);
      var customStyle =
          ".material-background {" +
          "   background-color          : " + appPrimaryColor + " !important;" +
          "   border-style              : none;" +
          "}" +
          ".spinner-android {" +
          "   stroke                    : " + appPrimaryColor + " !important;" +
          "}";

      switch (stateName) {
          case "app.productList" :
          case "app.productDetail":
          case "app.productCheckout":
          case "app.clothShop" :
          case "app.catalog" :
              customStyle += getProductStyle();
              break;
          case "app.dropboxLogin" :
          case "app.dropboxProfile":
          case "app.dropboxFeed" :
              customStyle += getSocialNetworkStyle(window.globalVariable.color.dropboxColor);
              break;
          case "app.facebookLogin" :
          case "app.facebookProfile":
          case "app.facebookFeed" :
          case "app.facebookFriendList":
              customStyle += getSocialNetworkStyle(window.globalVariable.color.facebookColor);
              break;
          case "app.foursquareLogin" :
          case "app.foursquareProfile":
          case "app.foursquareFeed" :
              customStyle += getSocialNetworkStyle(window.globalVariable.color.foursquareColor);
              break;
          case "app.googlePlusLogin" :
          case "app.googlePlusProfile":
          case "app.googlePlusFeed" :
              customStyle += getSocialNetworkStyle(window.globalVariable.color.googlePlusColor);
              break;
          case "app.instagramLogin" :
          case "app.instagramProfile":
          case "app.instagramFeed" :
              customStyle += getSocialNetworkStyle(window.globalVariable.color.instagramColor);
              break;
          case "app.wordpressLogin" :
          case "app.wordpressFeed":
          case "app.wordpressPost" :
              customStyle += getSocialNetworkStyle(window.globalVariable.color.wordpressColor);
              break;
          case "app.contractUs":
              customStyle += getContractUsStyle();
              break;
          default:
              customStyle += getDefaultStyle();
              break;
      }
      return customStyle;
  }// End createCustomStyle

  // Add custom style while initial application.
  $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);
  $ionicPlatform.ready(function($cordovaDevice) {
    ionic.Platform.isFullScreen = true;
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    /*
    var notificationOpenedCallback = function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window.plugins.OneSignal
      .startInit("84f75470-bcf3-46ab-9e7c-df626d35222e")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    */

    document.addEventListener('deviceready', function () {
      //alert("Entrou")  
      //alert("Device: "+$cordovaDevice.getDevice()+'\n Uuid: '+$cordovaDevice.getUUID());    
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal
        .startInit("84f75470-bcf3-46ab-9e7c-df626d35222e")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
      
      // Call syncHashedEmail anywhere in your app if you have the user's email.
      // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
      // window.plugins.OneSignal.syncHashedEmail(userEmail);
    }, false);

    initialRootScope();
    //Checking if view is changing it will go to this function.
    $rootScope.$on('$ionicView.beforeEnter', function () {
        //hide Action Control for android back button.
        hideActionControl();
        // Add custom style ti view.
        $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
    });

  });
})

.config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette, $mdIconProvider) {

  $mdThemingProvider
   .theme('default')
   .primaryPalette('light-green')
   .accentPalette('red');


  appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"]; //Use for get base color of theme.
  $stateProvider
          .state('app', {
              url: "/app",
              abstract: true,
              templateUrl: "templates/menu/menu.html",
              controller: 'menuCtrl'
          })
          .state('app.dashboard', {
              url: "/dashboard",
              params:{
                  isAnimated:false
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/home/home.html",
                      // controller: 'dashboardCtrl'
                  }
              }
          })
          .state('app.anuncios', {
              url: "/anuncios",
              params:{
                  isAnimated:false
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/anuncios/anuncios.html",
                      controller: 'anunciosCtrl'
                  }
              }
          })

          $urlRouterProvider.otherwise('/app/dashboard');
})
