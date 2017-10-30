angular.module("exemplo", []) //definição do módulo com injeção de dependência (ARRAY) vazia

/*
  controller do módulo, o que está dentro da array são 'o que aquele controller pode acessar'
  por exemplo, a factory de Redirecionar, já instanciado no módulo global APP (app.js)
 */

.controller("exemploController", exemploControllerFunction)

function exemploControllerFunction ($scope, Redirecionador, exemploFactory, $cordovaCamera, $cordovaFile) {
  $scope.cor = {} // Este objeto é do formulário de cadastro de cor
  $scope.imagem = true;
  $scope.enviado = false;

  $scope.redirecionar = function (rota) {
    Redirecionador.irPara(rota);
  }

  $scope.addImage = function () {
    var options = {
      quality: 50,
      destinationType : Camera.DestinationType.FILE_URI,
      //destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
      allowEdit : false,
      encodingType: Camera.EncodingType.JPEG,
      popoverOptions: CameraPopoverOptions,
    };

    // 3
    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imagem = false;
      //enviarImagem(imageData);


      // 4
      onImageSuccess(imageData);

      function onImageSuccess(fileURI) {
        createFileEntry(fileURI);
      }
   
      function createFileEntry(fileURI) {
        window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
      }
   
      // 5
      function copyFile(fileEntry) {
        var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
        var newName = makeid() + name;
   
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
          fileEntry.copyTo(
            fileSystem2,
            newName,
            onCopySuccess,
            fail
          );
        },
        fail);
      }
      
      // 6
      function onCopySuccess(entry) {
        $scope.$apply(function () {
          alert("url nativa: "+entry.nativeURL);
          enviarImagem(entry.nativeURL)
          $scope.images.push(entry.nativeURL);
        });
      }
   
      function fail(error) {
        console.log("fail: " + error.code);
      }
   
      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   
        for (var i=0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }
   
    }, function(err) {
      console.log(err);
    });
  }

  function enviarImagem (imagem) {
    $scope.imagem = false;
    var meuobj = {
      foto: imagem
    }
    exemploFactory.sendImage(meuobj)
      .then(function (response) {
        $scope.enviado = true;
        $scope.imagem = true;
        alert("enviou")
      })
      .catch(function (error) {
        alert("ctrl: "+error);
      })
  }

  $scope.add = function (corDoFormulario) {
    exemploFactory.cadastrar(corDoFormulario);  /* Chama a função cadastrar do exemploFactory passando como atributo a cor preenchida do formulário*/
    $scope.cor = undefined; /* Como está na mesma tela, tem que limpar o valor de $scope.cor após ser adicionado */
  }

  $scope.delete = function (indiceDaLista) {
    exemploFactory.excluir(indiceDaLista);
  }

  $scope.cores = exemploFactory.listar(); /* A listagem de cores (para mostrar na view) é o retorno da função listar do exemploFactory */
}
