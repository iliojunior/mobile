angular.module('home')
.factory('homeFactory', function ($http) {

  /* NÃO ESTÁ FAZENDO NADA ATÉ AGORA*/

  var URL = 'http://back.time02escoladeti.com/';

  var _getPessoaById = function (idPessoa) {
    return $http.get(URL+"pessoas/"+idPessoa)
            .then(function (response) {
              return response.data
            })
  };
  
  return {
    getPessoaById: _getPessoaById,
  }

})
