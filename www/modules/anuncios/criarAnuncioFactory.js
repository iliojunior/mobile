angular.module('anuncios')
.factory('criarAnuncioFactory', function($http, $filter){

	/*
	Cabeça:
	Reaproveitar a factory "anunciosFactory.js" pra listar os anuncios e pegar as categorias e sub categorias
	Manter as informações dos setores e adicionar a array de subcategorias que voce fez
	Na tela 'meus-anuncios.html' o SCOPO meusAnunciosAtivos é responsavel por pegar todos os anuncios que estao ativos
	Quando for criar um novo anuncio, adicionar ele na lista de anunciosPorSetor com o status = 2 (detalhe: status tem q por na mão, nao no formulario)
	Se der erro de não declarou o status (novoFormulario.status), criar um elemento HTML dentro do form ESCONDIDO com o ng-model status e o value = 2
	Ver se funções dessa factory já não estão implementadas na outra (provavelmente a de subcategorias não está implementada lá)
	A função getAnuncios é a mesma que a getAnunciosPorSetor da outra factory**


	*/


	var listaAnuncios = [];

	 //Array dos setores com suas respectivas categorias e subcategorias
	 var categorias = [
	 {id: 1, nome: 'Agrícola', subcategorias: [
	 {id: 1, nome: 'Trator ABCD'},
	 {id: 2, nome: 'Colheitadeira de cana'}
	 ]},
	 //deixei "3" porque se colocar o mesmo numero que tem o id de subcategoria da pau, por um tempo deixarei assim
	 {id: 3, nome: 'Construção', subcategorias: [
	 {id: 1, nome: 'Caminhão'},
	 {id: 2, nome: 'Carreta'}
	 ]},

	 {id: 4, nome: 'Industrial', subcategorias: [
	 {id: 1, nome: 'Carriola MNOP'},
	 {id: 2, nome: 'Betoneira QRST'}
	 ]},

	 ];
  //FIM Array dos setores com suas respectivas categorias e subcategorias
  

  var _getAllSetores = function () {    
  	return categorias;
  };



  var _getSubcategorias = function(categorias, categoriaSelecionada) {

			// if(categoriaSelecionada === '') {
			// 	console.log("Ta chamando");
			// 	return '';
			// 	var categoriaFiltrada = $filter('filter')(categorias, categoriaSelecionada);
			// 	return categoriaFiltrada[0].subcategorias;
			// }

			// console.log('categoria: ', categorias); // printar parametro
			// console.log('categoriaSelecionada: ', categoriaSelecionada); 
			if (!categoriaSelecionada || categoriaSelecionada === '') {
				// console.log('A   ', categoriaSelecionada);
				// console.log("caiu dentro do IF: categoria n foi selecionada");
				return '';
	} // se cair dentro do IF, ele retorna vazio, se não cair, vai pra baixo \/
	// console.log('B    ', categoriaSelecionada)
	// console.log("fora do IF: vai retornar a subcategoria");
	var categoriaFiltrada = $filter('filter')(categorias, categoriaSelecionada);
	// console.log('C   ', categoriaFiltrada);
	// console.log('D   ',categoriaFiltrada[0].subcategorias);
	return categoriaFiltrada[0].subcategorias;
}; 



var _salvar = function(novoAnuncio) {    
	listaAnuncios.push(novoAnuncio);	
	return true;
};

var _getAnuncios = function(){
	return listaAnuncios;
}




return {    
	getAllSetores: _getAllSetores,
	salvar: _salvar,
	getAnuncios: _getAnuncios,
	getSubcategorias: _getSubcategorias			
};

});



