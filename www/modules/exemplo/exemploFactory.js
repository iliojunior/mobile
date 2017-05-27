angular.module("exemplo") /* Não precisa por a array de dependência pois ela já foi declarada em alguma outra chamada do módulo "exemplo" (ver controller)*/
.factory("exemploFactory", exemploFactoryFunction)  /* Factory com o nome 'exmeploFactory' que é a função 'exemploFactoryFunction' (descrita abaixo) */


function exemploFactoryFunction () {

  var listaDeCores = [];

  var _cadastrar = function (cor) {
    listaDeCores.push(cor);
  }

  var _excluir = function (indice) {
    listaDeCores.splice(indice,1);
  }

  var _listar = function () {
    return listaDeCores;
  }

  /* O objeto EXEMPLOFACTORY (ln 2) sempre retorna um objeto (abaixo).
     As funções (declaradas como "var _nome") são "atributos" (na verdade métodos) do objeto EXEMPLOFACTORY.
     Elas são acessadas através da chamada 'exemploFactory.nome' (nomeDaFactory.nomeDoAtributo) */
  return {
    cadastrar: _cadastrar,
    excluir: _excluir,
    listar: _listar
  }
}
