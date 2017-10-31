angular.module("exemplo") /* Não precisa por a array de dependência pois ela já foi declarada em alguma outra chamada do módulo "exemplo" (ver controller)*/
.factory("exemploFactory", exemploFactoryFunction)  /* Factory com o nome 'exmeploFactory' que é a função 'exemploFactoryFunction' (descrita abaixo) */

function exemploFactoryFunction ($http,$cordovaFileTransfer) {

  var listaDeCores = [];

  var URL = 'http://back.time02escoladeti.com/';

  var _cadastrar = function (cor) {
    listaDeCores.push(cor);
  }

  var _excluir = function (indice) {
    listaDeCores.splice(indice,1);
  }

  var _listar = function () {
    return listaDeCores;
  }

  var _sendImage = function (imagem) {
    var finalURL = URL+"categorias/de08521c-fdff-43a1-886e-8295ca41b866";
    var options = {
      fileKey: "foto",    // vai pegar esse atributo
      httpMethod: "POST",
      mimeType: "image/jpeg",
      //params: {myDescription: "bla bla", rating: 5}, 
      chunkedMode: true
      // chunkedMode: false
    }

    return $cordovaFileTransfer.upload(finalURL, imagem, options, true)
      .then(function(response){
        return response;
      })
      .catch(function(error) {
        return false;
      })
  }


  /* O objeto EXEMPLOFACTORY (ln 2) sempre retorna um objeto (abaixo).
     As funções (declaradas como "var _nome") são "atributos" (na verdade métodos) do objeto EXEMPLOFACTORY.
     Elas são acessadas através da chamada 'exemploFactory.nome' (nomeDaFactory.nomeDoAtributo) */
   return {
    cadastrar: _cadastrar,
    excluir: _excluir,
    listar: _listar,
    sendImage: _sendImage,
  }
}
