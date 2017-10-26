angular.module('anuncios')
.factory('anunciosFactory', function ($http, $filter) {

  var URL = 'http://back.time02escoladeti.com/';
  /*     DADOS ESTÁTICOS     */


  var setores = [
    // {id: 1, nome: 'Agrícola', imagem: 'img/setor_agricola.jpg', descricao: ' Maquinários que facilitarão o seu trabalho.', quantidade: 40},
    // {id: 2, nome: 'Civil', imagem: 'img/setor_civil.jpg', descricao: ' Trabalhe com a segurança adequada.', quantidade: 10},
    // {id: 3, nome: 'Industrial', imagem: 'img/setor_industrial.jpg', descricao: ' A potência em larga escala que você precisa!', quantidade: 3},

    {id: 1, nome: 'Agrícola', imagem: 'img/setores/agricola.png', descricao: ' Maquinários que facilitarão o seu trabalho na lavoura.', subcategorias: [
    {id: 1, nome: 'Trator ABCD'},
    {id: 2, nome: 'Colheitadeira de cana'}
    ]},
    {id: 3, nome: 'Construção', imagem: 'img/setores/civil.png', descricao: ' Trabalhe com a segurança adequada.', subcategorias: [
    {id: 1, nome: 'Caminhão'},
    {id: 2, nome: 'Carreta'}
    ]},
    {id: 4, nome: 'Industrial', imagem: 'img/setores/industrial.png', descricao: ' A potência em larga escala que você precisa!', subcategorias: [
    {id: 1, nome: 'Carriola MNOP'},
    {id: 2, nome: 'Betoneira QRST'}
    ]},
  ];

  var _anunciosPorSetor = [ // ESTÁTICO
    {id: 1, titulo: 'Trator F700', id_setor: 1, fotos: ['img/anuncios/trator_1.jpg','img/shirt_01.png','img/shirt_02.png'], descricao: 'Trator em ótimo estado, bom para colheitas pequenas, motor poderoso e silencioso!', cidade: 'Maringá', estado: 'PR', valor: 12.50, statusAnuncio: 1, impulsao: 4, marca: 'Valtra', ano: 2001, modoCobranca: 'Por Dia', telefone: 44123456789, negociavel: false, },
    {id: 2, titulo: 'Caminhão VOLVO', id_setor: 2,  fotos: ['img/anuncios/caminhao.jpg','img/shirt_01.png','img/shirt_02.png'], descricao: 'Disponibilizo meu caminhão para realizar diversas entregas, vamos negociar?', cidade: 'Maringá', estado: 'PR', valor: 89.00, statusAnuncio: 0, impulsao: 0, marca: 'Volvo', ano: 1997, modoCobranca: 'Por Dia', telefone: 44123456789, negociavel: false, },
    {id: 3, titulo: 'Secadora Multi-Uso', id_setor: 3,  fotos: ['img/anuncios/secadora.gif','img/shirt_01.png','img/shirt_02.png'], descricao: 'Minha secadora de grãos está parada e preciso de dinheiro', cidade: 'Cianorte', estado: 'PR', valor: 51.50, statusAnuncio: 2, impulsao: 2, marca: 'Mediza', ano: 2001, modoCobranca: 'Por Hora', telefone: 44123456789, negociavel: false, },
    {id: 4, titulo: 'Colheitadeira 50-50', id_setor: 1,  fotos: ['img/anuncios/colheitadeira.jpg','img/shirt_01.png','img/shirt_02.png'], descricao: 'Máquina perfeita para acelerar seu processo, você não pode perder!!!!', cidade: 'Curitiba', estado: 'PR', valor: 159.00, statusAnuncio: 2, impulsao: 0, marca: 'Massey Ferguson', ano: 2015, modoCobranca: 'Por Dia', telefone: 44123456789, negociavel: false, },
    {id: 5, titulo: 'Carriola 50Kg', id_setor: 2,  fotos: ['img/anuncios/carriola.jpg','img/shirt_01.png','img/shirt_02.png'], descricao: 'Carriola novinha aguentando até 50kg, contato por whatsapp', cidade: 'Cianorte', estado: 'PR', valor: 27.10, statusAnuncio: 1, impulsao: 1, marca: 'Twenga', ano: 2017, modoCobranca: 'Por Hora', telefone: 44123456789, negociavel: false, },
  ]

  var _tiposDeImpulsao = [
    {id: 1, nome: 'Bronze', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada semana durante 3 meses. Lista de resultados da galeria por 7 dias!', valor: 10.99, tempo: 90, cor: '#c38d4a'},
    {id: 2, nome: 'Prata', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada semana durante 3 meses. Lista de resultados da galeria por 14 dias!', valor: 16.99, tempo: 90, cor: '#b4b7b2'},
    {id: 3, nome: 'Ouro', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas a cada 4 dias durante 5 meses. Lista de resultados da galeria por 30 dias!', valor: 21.99, tempo: 150, cor: '#e2cc2d'},
    {id: 4, nome: 'Diamante', descricao: 'Seu anúncio ficará no topo do resultado das pesquisas todo dia durante 7 meses. Lista de resultados da galeria por 30 dias!', valor: 30.99, tempo: 210, cor: '#2de2b0'},
  ]

  var _anuncio = {id: 1, nome: 'Trator ABCD', cidade: 'Maringá', estado: 'PR', valor: 12.50,
                 fotos: ['img/bg_cover_01.png','img/app_icon.png','img/food_01.png'] }

  /*   FIM DADOS ESTÁTICOS     */

  var _getAllSetores = function () {
    return $http.get(URL + "categorias")
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
  };

  var _getFotoDaCategoriaPorId = function (idDaCategoria) {
    return $http.get(URL + "fotos/"+idDaCategoria)
        .then(function (response) {
          //console.log(response.data);
          //console.log("http://files.time02escoladeti.com/"+response.data.nomeFoto);
          return "http://files.time02escoladeti.com/"+response.data.nomeFoto;
        })
  }

  //codigo do criarAnuncioFactory
  var _getSubcategorias = function(setores, categoriaSelecionada) {

    if (!categoriaSelecionada || categoriaSelecionada === '') {
      return '';
    }
    var categoriaFiltrada = $filter('filter')(setores, categoriaSelecionada);    
    return categoriaFiltrada[0].subcategorias;
  }; 

  var _getTiposDeImpulsao = function () {
    // método HTTP
    /*
    return $http.get(URL)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    return _tiposDeImpulsao;
  };

  var _getTipoDeImpulsaoPorId = function (id) {
    // método HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _tiposDeImpulsao.length; i++) {
      if (_tiposDeImpulsao[i].id === id) {
        return _tiposDeImpulsao[i]
      }
    }
  }

  var _getAnunciosPorSetor = function (id) {
    // Método HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    return _anunciosPorSetor;
  };

  var _getAnunciosPorStatus = function (status) {
    // MÉTODO HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    var anunciosRetornados = []
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].statusAnuncio === status) {
        anunciosRetornados.push(_anunciosPorSetor[i])
      }
    }
  }

  var _cadastrarAnuncio = function (objetoAnuncioDoFormulario) {
    /*
    var params = {fotos: objetoAnuncioDoFormulario.fotos, titulo: objetoAnuncioDoFormulario.titulo, descricao: objetoAnuncioDoFormulario.descricao, 
                  telefone: objetoAnuncioDoFormulario.telefone, modelo: objetoAnuncioDoFormulario.modelo, ano: objetoAnuncioDoFormulario.ano,
                  categoriaAnuncio: objetoAnuncioDoFormulario.categoria, subCategoriaId: objetoAnuncioDoFormulario.subcategoria,
                  valor: objetoAnuncioDoFormulario.valor}
    return $http.post(URL + '/anuncios', objetoAnuncioDoFormulario)
      .then( function (response) {
        console.log("resposta:", response);
        if (response.data.valido === "true") {
          return true;
        } else {
          return false;
        }
      })        
      .catch( function (error) {
        console.log('error',error)
        return false;
      }
    )
    */
    console.log('dentro',objetoAnuncioDoFormulario);
    _anunciosPorSetor.push(objetoAnuncioDoFormulario);
  }

  var _getAnunciosPorStatus = function (status) {
    // MÉTODO HTTP
    /*
    return $http.get(URL + "/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    var anunciosRetornados = []
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].statusAnuncio === status) {
        anunciosRetornados.push(_anunciosPorSetor[i])
      }
    }
    return anunciosRetornados;
  }

  var _getMeusAnunciosPublicados = function (idDoCriadorDoAnuncio) {
    return $http.get(URL + "anuncios/findAllAnunciosPublicados/" + idDoCriadorDoAnuncio)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })    
  }

  var _getMeusAnunciosAguardandoAprovacao = function (idDoCriadorDoAnuncio) {
    return $http.get(URL + "anuncios/findAllAnunciosAguardandoAprovacao/" + idDoCriadorDoAnuncio)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })    
  }

  var _getMeusAnunciosExpirados = function (idDoCriadorDoAnuncio) {
    return $http.get(URL + "anuncios/findAllAnunciosExpirados/" + idDoCriadorDoAnuncio)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })    
  }

  var _getAnuncioPorId = function (idAnuncio) {
    // Método HTTP
    /*
    return $http.get(URL + "anuncios/findAnuncioById/" + id)
      .then( function (response) {
        return response.data
      })
      .catch( function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].id === parseInt(idAnuncio)) {
        return _anunciosPorSetor[i];
      }
    }
  }

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
    /*
    return $http.delete(URL + "anuncios/" + id)
      .then( function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    */
    for (var i = 0; i < _anunciosPorSetor.length; i++) {
      if (_anunciosPorSetor[i].id === idAnuncioRemovido) {
        _anunciosPorSetor.splice(i,1);
      }
    }
  }

  var _ativarAnuncioExpirado = function (idDoAnuncioExpirado) {
    // tem q fazer o método HTTP
    /*
    var params = {id: idDoAnuncioExpirado};
    return $http.put(urlApi + "/editar", params)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    */
    var anuncioPraAtivar = _getAnuncioPorId(idDoAnuncioExpirado);
    anuncioPraAtivar.statusAnuncio = 2;
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
    getFotoDaCategoriaPorId: _getFotoDaCategoriaPorId,
    editarAnuncio: _editarAnuncio,
    getAnunciosPorSetor: _getAnunciosPorSetor,
    cadastrarAnuncio: _cadastrarAnuncio,
    getAnunciosPorStatus: _getAnunciosPorStatus,
    getMeusAnunciosPublicados: _getMeusAnunciosPublicados,
    getMeusAnunciosAguardandoAprovacao: _getMeusAnunciosAguardandoAprovacao,
    getMeusAnunciosExpirados: _getMeusAnunciosExpirados,
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