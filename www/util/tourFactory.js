angular.module('util')
.factory('tourFactory', function (nzTour, $q) {

	var _esconderMenu = false;

	var _tourTeste = [{
				target: '#menuHomeTour',
				content: 'Para ser direcionado a página principal, clique aqui!!',
				placementPriority: [ 'bottom' ],
			}, {
				target: '#menuMeusAnunciosTour',
				content: 'Veja seus anúncios ou ainda crie um novo!',
			}, {
				target: '#menuMeusCartoesTour',
				content: 'Gerencie seus cartões de crédito aqui!',
			}, {
				target: '#menuSairTour',
				content: 'Se quiser trocar de usuário ou apenas sair.',
			},
	]

	var _tourConfiguracoes =  {
	    config: {
	      mask: {
	            visible: true, // Shows the element mask
	            visibleOnNoTarget: false, // Shows a full page mask if no target element has been specified
	            clickThrough: false, // Allows the user to interact with elements beneath the mask
	            clickExit: false, // Exit the tour when the user clicks on the mask
	            scrollThrough: true, // Allows the user to scroll the scrollbox or window through the mask
	            color: 'rgba(0,0,0,.8)' // The mask color
	        },
	        scrollBox: 'body', // The container to scroll when searching for elements
	        previousText: 'Anterior',
	        nextText: 'Próximo',
	        finishText: 'Fim',
	        showPrevious: true, // Setting to false hides the previous button
	        showNext: true, // Setting to false hides the next button
	        animationDuration: 200, // Animation Duration for the box and mask
	        placementPriority: ['bottom', 'right', 'top','left'],
	        dark: false, // Dark mode (Works great with `mask.visible = false`)
	        disableInteraction: false, // Disable interaction with the highlighted elements
	        highlightMargin: 3, // Margin of the highglighted area
	        disableEscExit: false, // Disable end of tour when pressing ESC,
	        onClose: function() {
	        	console.log("kkk fechou")
	        	localStorage.setItem('tourFinalizado',"true");
	        }, //Function called when the tour is closed
	        onComplete: function() {
	        	console.log('completouuuuu')
	        	localStorage.setItem('tourFinalizado',"true");
	        } //Function called when the tour is completed
	    },
      	steps: _tourTeste,
  	}

  	function iniciarTour () {
  		//nzTour.start(_tourConfiguracoes)
  		return new Promise(function (resolve) {
           return resolve(nzTour.start(_tourConfiguracoes));
       	});
  		//return nzTour.start(_tourConfiguracoes);
  	}

  	function finalizarTour () {
  		return new Promise(function (resolve) {
           return resolve(nzTour.stop());
       });
  	}

	return {
		iniciarTour: iniciarTour,
		finalizarTour: finalizarTour,
	}

})