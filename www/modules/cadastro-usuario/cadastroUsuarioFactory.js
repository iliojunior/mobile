angular.module('cadastroUsuario')
.factory('cadastroUsuarioFactory', function ($http) {

  var URL = 'http://back.time02escoladeti.com/';

  var _validarCadastro = function (usuarioDoFormularioDeCadastro) {
    if (usuarioDoFormularioDeCadastro.senha === usuarioDoFormularioDeCadastro.senhaConfirmada) {
      return true;
    } else {
      return false;
    }
  }

  var _cadastrarPessoaFisica = function (pessoaFisica) {
    /*var params = {
      url: URL + "pessoas/fisica",
      method:'post',
      data: pessoaFisica,
      headers: {
        Accept: 'text/plain'
      }
    }
    return $http(params).then(function (response) {
      console.log(response.data)
        return response.data;
      })
      .catch( function (error) {
        console.log(error);
      })*/
    return $http.post(URL + "pessoas/fisica", pessoaFisica)
            .then(function (response) {
              console.log("resposta:", response.data.idGerado);
              return response.data
            })    

  }

  var _cadastrarPessoaJuridica = function (pessoaJuridica) {
    /*var params = {
      url: URL + "pessoas/juridica",
      method:'post',
      data: pessoaJuridica,
      headers: {
        Accept: 'text/plain'
      }
    }
    return $http(params).then(function (response) {
        return(response.data)
      })
      .catch( function (error) {
        console.log(error);
      })*/
      return $http.post(URL+"pessoas/juridica",pessoaJuridica)
        .then( function (response) {
          return response.data;
        })
        .catch( function (error) {
          console.log(error)
        })
  }

  var _cadastrarUsuario = function (usuario) {
    /*var params = {
      url: URL + "usuarios",
      method:'post',
      data: usuario,
      headers: {
        Accept: 'text/plain'
      }
    }
    return $http(params)
      .then( function (response) {
        return response;
      })
      .catch( function (error) {
        console.log(error);
      })*/
      return $http.post(URL+"usuarios",usuario)
        .then( function (response) {
          console.log("cadastrar usuario: ");
          console.log(response);
          return response.data
        })
        .catch( function (error) {
          console.log(error);
        })
  }

  return {
    validarCadastro: _validarCadastro,
    cadastrarPessoaFisica: _cadastrarPessoaFisica,
    cadastrarPessoaJuridica: _cadastrarPessoaJuridica,
    cadastrarUsuario: _cadastrarUsuario,
  }

})
