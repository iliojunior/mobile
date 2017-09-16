angular.module('anuncios')
.factory('anunciosFactory', function ($http, $filter) {

  var setores = [
  {id: 1, nome: 'Agrícola', imagem: 'img/setores/agricola.png', frase: ' Maquinários que facilitarão o seu trabalho na lavoura.', subcategorias: [
  {id: 1, nome: 'Trator ABCD'},
  {id: 2, nome: 'Colheitadeira de cana'}
  ]},
  {id: 3, nome: 'Construção', imagem: 'img/setores/civil.png', frase: ' Trabalhe com a segurança adequada.', subcategorias: [
  {id: 1, nome: 'Caminhão'},
  {id: 2, nome: 'Carreta'}
  ]},
  {id: 4, nome: 'Industrial', imagem: 'img/setores/industrial.png', frase: ' A potência em larga escala que você precisa!', subcategorias: [
  {id: 1, nome: 'Carriola MNOP'},
  {id: 2, nome: 'Betoneira QRST'}
  ]},
  ];

  var _anunciosPorSetor = [ // ESTÁTICO
  {id: 1, nome: 'Trator F700', id_setor: 1, imagem: 'img/anuncios/trator_1.jpg', descricao: 'Trator em ótimo estado, bom para colheitas pequenas, motor poderoso e silencioso!', cidade: 'Maringá', estado: 'PR', preco: 12.50, status: 1, impulsao: 4, marca: 'Valtra', ano: 2001, cobranca: 'Por Dia'},
  {id: 2, nome: 'Caminhão VOLVO', id_setor: 2, imagem: 'img/anuncios/caminhao.jpg', descricao: 'Disponibilizo meu caminhão para realizar diversas entregas, vamos negociar?', cidade: 'Maringá', estado: 'PR', preco: 89.00, status: 0, impulsao: 0, marca: 'Volvo', ano: 1997, cobranca: 'Por Dia'},
  {id: 3, nome: 'Secadora Multi-Uso', id_setor: 3, imagem: 'img/anuncios/secadora.gif', descricao: 'Minha secadora de grãos está parada e preciso de dinheiro', cidade: 'Cianorte', estado: 'PR', preco: 51.50, status: 2, impulsao: 2, marca: 'Mediza', ano: 2001, cobranca: 'Por Hora'},
  {id: 4, nome: 'Colheitadeira 50-50', id_setor: 1, imagem: 'img/anuncios/colheitadeira.jpg', descricao: 'Máquina perfeita para acelerar seu processo, você não pode perder!!!!', cidade: 'Curitiba', estado: 'PR', preco: 159.00, status: 2, impulsao: 0, marca: 'Massey Ferguson', ano: 2015, cobranca: 'Por Dia'},
  {id: 5, nome: 'Carriola 50Kg', id_setor: 2, imagem: 'img/anuncios/carriola.jpg', descricao: 'Carriola novinha aguentando até 50kg, contato por whatsapp', cidade: 'Cianorte', estado: 'PR', preco: 27.10, status: 1, impulsao: 1, marca: 'Twenga', ano: 2017, cobranca: 'Por Hora'},
  ]

  var _tiposDeImpulsao = [
  {id: 1, nome: 'Bronze', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada semana durante 3 meses. Lista de resultados da galeria por 7 dias!', preco: 10.99, tempo: 90, cor: '#c38d4a'},
  {id: 2, nome: 'Prata', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada semana durante 3 meses. Lista de resultados da galeria por 14 dias!', preco: 16.99, tempo: 90, cor: '#b4b7b2'},
  {id: 3, nome: 'Ouro', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada 4 dias durante 5 meses. Lista de resultados da galeria por 30 dias!', preco: 21.99, tempo: 150, cor: '#e2cc2d'},
  {id: 4, nome: 'Diamante', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas todo dia durante 7 meses. Lista de resultados da galeria por 30 dias!', preco: 30.99, tempo: 210, cor: '#2de2b0'},
  ]

  var _anuncio = {id: 1, nome: 'Trator ABCD', imagem: 'img/bg_cover_01.png', cidade: 'Maringá', estado: 'PR', preco: 12.50}

  var _getAllSetores = function () {
    // método HTTP
    return setores;
  };

  //codigo do criarAnuncioFactory
  var _getSubcategorias = function(setores, categoriaSelecionada) {

    if (!categoriaSelecionada || categoriaSelecionada === '') {
      return '';
    } var categoriaFiltrada = $filter('filter')(setores, categoriaSelecionada);    
    return categoriaFiltrada[0].subcategorias;
  }; 


  var _getTiposDeImpulsao = function () {
    // método HTTP
    return _tiposDeImpulsao;
  };

  var _getTipoDeImpulsaoPorId = function (id) {
    // método HTTP
    for (var i = 0; i < _tiposDeImpulsao.length; i++) {
      if (_tiposDeImpulsao[i].id === id) {
        return _tiposDeImpulsao[i]
      }
    }
  }

  var _getAnunciosPorSetor = function (novoAnuncio) {
    // Método HTTP
   _anunciosPorSetor.push(novoAnuncio);  
   return _anunciosPorSetor;
 };


 var _getAnunciosPorStatus = function (status) {
  var anunciosRetornados = [];
  for (var i = 0; i < _anunciosPorSetor.length; i++) {
    if (_anunciosPorSetor[i].status === status) {
      anunciosRetornados.push(_anunciosPorSetor[i])
    }
  }
  return anunciosRetornados;
}

var _getAnuncioPorId = function (idAnuncio) {
  for (var i = 0; i < _anunciosPorSetor.length; i++) {
    if (_anunciosPorSetor[i].id === parseInt(idAnuncio)) {
      return _anunciosPorSetor[i];
    }
  }
    // Método HTTP
    // return _anuncio;
  };

  var _getAnunciosFiltrados = function (termosDaPesquisa) {
    var arrayFiltrada = [];
    _anunciosPorSetor.filter( function (arrayAnuncios) {
      if (termosDaPesquisa.setor === arrayAnuncios.id_setor) {
        arrayFiltrada.push(arrayAnuncios)
      }
    })
    return arrayFiltrada;
    // return _anunciosPorSetor;
  }

  var _excluirAnuncio = function (idAnuncioRemovido) {
    //método HTTP
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].id === idAnuncioRemovido) {
        _anunciosPorSetor.splice(i,1);
      }
    }
  }

  var _ativarAnuncioExpirado = function (idDoAnuncioExpirado) {
    // tem q fazer o método HTTP
    var anuncioPraAtivar = _getAnuncioPorId(idDoAnuncioExpirado);
    anuncioPraAtivar.status = 1;
  }




  //teste do editar
  var _editarAnuncio = function(objetoDoFormulario) {
  // primeiro pesquisa pra ver se existe na array de anuncios (acho q é a _anuncios)
  for (i=0; i<= _anunciosPorSetor.length; i++) {
    if (_anunciosPorSetor[i].id === objetoDoFormulario.id) {
      _anunciosPorSetor[i] = objetoDoFormulario; // aqui voce substitui o objeto inteiro que respondeu no formulario no lugar do antigo
    } 
  }
}


  return {
    getAllSetores: _getAllSetores,
    editarAnuncio: _editarAnuncio,
    getAnunciosPorSetor: _getAnunciosPorSetor,
    getAnunciosPorStatus: _getAnunciosPorStatus,
    getAnuncioPorId: _getAnuncioPorId,
    getAnunciosFiltrados: _getAnunciosFiltrados,
    getTiposDeImpulsao: _getTiposDeImpulsao,
    getTipoDeImpulsaoPorId: _getTipoDeImpulsaoPorId,
    ativarAnuncioExpirado: _ativarAnuncioExpirado,
    excluirAnuncio: _excluirAnuncio,
    getSubcategorias: _getSubcategorias
    //salvar: _salvar
  }

})
