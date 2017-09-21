angular.module('login')
.factory('loginFactory', function ($http) {

  var URL = 'http://10.42.0.1:8081/';

  var _validarEmail = function (email) {
    var regularExpression = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (regularExpression.test(email)) {
      return true;
    } else {
      return false;
    }
  }

    var _validarLogin = function (usuarioDoFormularioDeLogin) {
      var params = {login: usuarioDoFormularioDeLogin.email, senha: usuarioDoFormularioDeLogin.senha}
      return $http.post(URL + 'login/logar',params)
        .then( function (response) {
          if (response.data.valido === "true") {
            return true;
          } else {
            return false;
          }
          //return true;
        })
        /*
        .catch( function (error) {
          console.log('error',error)
          return false;
        })
        */
      
      /* EXEMPLO DE HTTP GET */
      /*
      return $http.get('https://jsonplaceholder.typicode.com/posts/1')
        .then( function (response) {
          //console.log('factory: ',response.data)
          return response.data
        })  
        .catch( function (error) {
          console.log('erro: ',error);
          return false;
        })
      */      
      //var params = {email: usuarioDoFormularioDeLogin.email, senha: usuarioDoFormularioDeLogin.senha};
      /*
      return $http.post('http://jsonplaceholder.typicode.com/posts', usuarioDoFormularioDeLogin)
        .then( function (response) {
          console.log('dentro do then: ',response.data);
          return true;
        })
        .catch( function (error) {
          console.log('erro: ',error);
          return false;
        })
        */
    };

  var _logarUsuario = function (usuarioDoFormulario) {
    // salvar objeto no local storage
  }

  var _deslogar = function (usuarioDoFormularioDeLogin) {
    console.log("A função 'deslogar' ainda não faz nada");
  };

  var _novaSenha = function (emailDeRecuperacao) {
    console.log(emailDeRecuperacao)
    return true;
    //return $http.get(URL + 'recuperar/' + emailDeRecuperacao)
    /*
    return $http.post(URL + 'recuperar/', {email: emailDeRecuperacao})
      .then( function (response) {
        console.log(response.data)
        return true;
      })
      .catch( function (error) {
        console.log(error)
        return false;
      })
    */
    /* EXEMPLO TESTE FUNCIONANDO 
    console.log('dentro da função nova senha')
    var params = {title: 'Titulo', body: 'corpo', userId: 1}
    return $http.post('http://jsonplaceholder.typicode.com/posts', params)
      .then( function (response) {
        console.log('dentro do then: ',response.data);
        return true;
      })
    */
  }

  return {
    validarEmail: _validarEmail,
    validarLogin: _validarLogin,
    logarUsuario: _logarUsuario,
    deslogar: _deslogar,
    novaSenha: _novaSenha,
  }

})
