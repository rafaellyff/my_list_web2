if( window.location.pathname.match(/series/)){
	$(document).ready(function() {
		if ( window.location.pathname.match(/edit/)) {
			selectFormato()
			formEditarSerie();
		} else if (window.location.pathname.match(/ver/)){
			preencherVerSerie();
			selectCategoria();
			listaCategoria();
			listaEpisodio();
		}else if (window.location.pathname.match(/new/)){
			selectFormato();
		}

		// BTN FORM SALVAR
		$('#salvarSerie').on('click', adicionarSerie);
		// BTN EDITAR SERIE
		$('.editarSerie').on('click', editarSerie);
		// VOLTAR SHOW
		$('.voltarFormSerie').on('click', voltarFormSerie);
		// BTN FORM EDITAR 
		$('#alterarSerie').on('click', atualizarSerie);
		// BTN EXCLUIR SERIE
		$('.excluirSerie').on('click', deletarSerie);
		// VOLTAR LISTAGEM
		$('.voltarSerie').on('click', voltarSerie);
		// CATEGORIAS DA SERIE
		$('#adicionarCategoriaSerie').on('click', adicionarCategoriaSerie);
		$('#lista_categorias').on('click', '.closeCategoria', excluirCategoriaSerie);

		// EPISODIOS DA SERIE
		$('#adicionarEpisodio').on('click', adicionarEpisodioSerie);
		$('#listagemEpisodio').on('click', '.btnEditarEp', editarEpisodio);
		$('#listagemEpisodio').on('click', '.btnDeletarEp', deletarEpisodio);
		$('#alterarEpisodio').on('click', atualizarEpisodio);
		

	});

	// SELECT DE FORMATO
	function selectFormato(){
		let dropdown = $('#formato');
		dropdown.empty();

		$.getJSON('/formatos/').done(function(data) {
			$.each(data, function (i, formato) {
    		dropdown.append($('<option></option>').attr('value', formato.id).text(formato.descricao));
    	});
		});
	}

	// ADICIONAR REGISTRO
	function adicionarSerie(event) {
		event.preventDefault();
		var titulo = $('#titulo').val();
		var formato = $('#formato').val();
		var usuario = $('#usuario').val();

		if (titulo != "" && formato != "") {
			var serie = { 'titulo': titulo , 'formato': formato, 'usuario': usuario};
			serie = { "serie": serie }
			$.ajax({
				type: 'POST',
				data: serie,
				url: '/series/',
				dataType:"json",
			}).done(function( response ) {
				$(location).attr('href', '/series/ver/'+ response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};


	// ABRIR TELA DE EDITAR 
	function editarSerie(event){
		event.preventDefault();
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$(location).attr('href', '/series/'+ id +'/edit');
	}

	// PREENCHER FORM DE EDITAR SERIE
	function formEditarSerie(event){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/series/' + id).done(function(data) {
			$('#titulo').val(data.titulo);
			$('#formato').val(data.id);
		})
	}


	// ATUALIZAR REGISTRO
	function atualizarSerie(event){
		event.preventDefault();
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		var titulo = $('#titulo').val();
		var formato = $('#formato').val();

		if (titulo != "" && formato != "") {
			var serie = { 'titulo': titulo , 'formato': formato};
			serie = { "serie": serie }
			$.ajax({
				type: 'PUT',
				data: serie,
				url: '/series/'+id,
				dataType:"json",
			}).done(function( response ) {
				$(location).attr('href', '/series/ver/'+response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};

	// VOLTAR PARA A TELA DE SHOW
	function voltarFormSerie(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$(location).attr('href', '/series/ver/' + id);
	}

	// DELETAR ITEM
	function deletarSerie(event) {
		event.preventDefault();
		var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
		if (confirmation === true) {
			var serie = window.location.pathname.replace(/[^0-9]/g,'');
			$.ajax({
				type: 'DELETE',
				url: '/series/' + serie
			}).done(function( response ) {
				voltarSerie();
			});
		}else {
			return false;
		}
	};

	// VOLTAR PARA A TELA DE SHOW
	function voltarFormSerie(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$(location).attr('href', '/series/ver/' + id);
	}

	// VOLTAR PARA A TELA DE LISTAGEM
	function voltarSerie(){
		$(location).attr('href', '/filmes/listagem');
	}

	// PREENCHER TELA DE VISUALIZAR 
	function preencherVerSerie(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/series/' + id).done(function(data) {
			$('#titulo').text(data.titulo);
			$('#formato').text(data.descricao);
		});
	}

	// SELECT PARA ADICIONAR UMA CATEGORIA A SERIE
	function selectCategoria(){
		let dropdown = $('#categoria');
		$.getJSON('/categorias/').done(function(data) {
			$.each(data, function (i, categoria) {
    		dropdown.append($('<option></option>').attr('value', categoria.id).text(categoria.descricao));
    	});
		});
	}

	// PREENCHER TELA DE VISUALIZAR 
	function listaCategoria(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/series/list_categoria/' + id).done(function(data) {
			var $listagem = $('#lista_categorias'); 
			$listagem.empty();
			$.each(data, function(i, categoria) {
				$listagem.append('<span class="badge badge-primary">'+ this.descricao +' &nbsp<button type="button" class="close closeCategoria" aria-label="Close"  data-id="' + this.id + '><span aria-hidden="true">&times;</span> </button></span> &nbsp');
			});
		});
	}

	// REMOVER UMA CATEGORIA DE UMA SERIE
	function excluirCategoriaSerie() {
		event.preventDefault();
		var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
		if (confirmation === true) {
			var serie = window.location.pathname.replace(/[^0-9]/g,'');
			var categoria = $(this).data('id');
			var categoriaserie = { 'serie_id': serie, 'categoria_id': categoria };
			categoriaserie = { "categoriaserie": categoriaserie}
			$.ajax({
				type: 'DELETE',
				data: categoriaserie,
				url: '/series/excluir_categoria',
				dataType:"json",
			}).done(function( response ) {
				var $listagem = $('#lista_categorias'); 
				$listagem.empty();
				$.each(response, function(i, categoria) {
					$listagem.append('<span class="badge badge-primary">'+ this.descricao +' &nbsp<button type="button" class="close closeCategoria" aria-label="Close"  data-id="' + this.id + '><span aria-hidden="true">&times;</span> </button></span> &nbsp');
				});
			});
		} else {
			return false;
		}
	}

	// ADICIONAR UMA CATEGORIA A UMA SERIE
	function adicionarCategoriaSerie() {
		var serie = window.location.pathname.replace(/[^0-9]/g,'');
		var categoria = $('#categoria').val();
		if (categoria != "" ) {
			var categoriaserie = { 'serie_id': serie, 'categoria_id': categoria };
			categoriaserie = { "categoriaserie": categoriaserie}
			$.ajax({
				type: 'POST',
				data: categoriaserie,
				url: '/series/add_categoria',
				dataType:"json",
			}).done(function( response ) {
				var $listagem = $('#lista_categorias'); 
				$listagem.empty();
				$.each(response, function(i, categoria) {
					$listagem.append('<span class="badge badge-primary">'+ this.descricao +' &nbsp<button type="button" class="close closeCategoria" aria-label="Close"  data-id="' + this.id + '><span aria-hidden="true">&times;</span> </button></span> &nbsp');
				});
				$('#categoria').val("");
			});
		} else {
			alert("Selecione uma Categoria")
		}
	}




// EPISODIOS

	// PREENCHER TELA DE VISUALIZAR 
	function listaEpisodio(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.ajax({
			type: 'GET',
			data: {serie_id: id},
			url: '/episodios',
			dataType:"json",
		}).done(function( response ) {
		 	var $listagem = $('#listagemEpisodio'); 
			$listagem.empty();
			$.each(response, function(i, categoria) {
				$listagem.append('<tr><td>'+this.titulo+'</td><td>'+this.duracao+'</td><td><a href="#" class="btn btn-light btn-sm btnEditarEp" data-id="' + this.id + '">Editar</a></td><td><a href="#" class="btn btn-danger text-white btn-sm  btnDeletarEp" data-id="' + this.id + '">Deletar</a></td></tr>');
			});
		});
	}

	// ADICIONAR UM EPISODIO A UMA SERIE
	function adicionarEpisodioSerie() {
		var serie = window.location.pathname.replace(/[^0-9]/g,'');
		var titulo = $('#tituloEp').val();
		var duracao = $('#duracaoEp').val();
		if (titulo != "" && duracao != "" ) {
			var episodio = { 'serie_id': serie, 'titulo': titulo, 'duracao' : duracao };
			episodio = { "episodio": episodio}
			$.ajax({
				type: 'POST',
				data: episodio,
				url: '/episodios',
				dataType:"json",
			}).done(function( response ) {
				var $listagem = $('#listagemEpisodio'); 
				$listagem.empty();
				$.each(response, function(i, categoria) {
					$listagem.append('<tr><td>'+this.titulo+'</td><td>'+this.duracao+'</td><td><a href="#" class="btn btn-light btn-sm btnEditarEp" data-id="' + this.id + '">Editar</a></td><td><a href="#" class="btn btn-danger text-white btn-sm btnDeletarEp" data-id="' + this.id + '">Deletar</a></td></tr>');
				});
				$('#tituloEp').val("");
				$('#duracaoEp').val("");
			});
		} else {
			alert("Preencha todos os campos")
		}
	}

	// DELETAR ITEM
	function deletarEpisodio(event) {
		event.preventDefault();
		var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
		if (confirmation === true) {
			var id = $(this).data('id');
			$.ajax({
				type: 'DELETE',
				url: '/episodios/' + id
			}).done(function( response ) {
				location.reload(true);
			});
		}else {
			return false;
		}
	};

	// ABRIR MODAL DE EDITAR 
	function editarEpisodio(event){
		event.preventDefault();
		var id = $(this).data('id');
		$.getJSON('/episodios/' + id).done(function(data) {
			$('#tituloEpEdit').val(data.titulo);
			$('#duracaoEpEdit').val(data.duracao);
			$('#idEpEdit').val(data.id);
			$('#editarEpModal').modal('show');
		});
	}

	// ATUALIZAR REGISTRO
	function atualizarEpisodio(event){
		event.preventDefault();
		var id = $('#idEpEdit').val();
		var titulo = $('#tituloEpEdit').val();
		var duracao = $('#duracaoEpEdit').val();
		if (titulo != "" && duracao != "") {
			var episodio = { 'titulo': titulo , 'duracao': duracao};
			episodio = { "episodio": episodio }
			$.ajax({
				type: 'PUT',
				data: episodio,
				url: '/episodios/'+id,
				dataType:"json",
			}).done(function( response ) {
					location.reload(true);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};
}


// ACERVO NA TELA DE FILMES

if( window.location.pathname.match(/filmes/)){
	$(document).ready(function() {
		if ( window.location.pathname.match(/listagem/)) {
			listagemSerie();
		}
		// VER SERIE
		$('#listagemSerie').on('click', '.card-link', verSerie);
		// TELA DE NOVO
		$('#novaSerie').on('click', novaSerie);
	});

	// LISTAGEM DE SERIE
  function listagemSerie(){
  	var $listagem = $('#listagemSerie'); 
  	$.ajax({  
  		type: 'GET',
  		dataType: 'json',
  		url: '/series',
  		success: function(series){
  			$.each(series, function(i, serie) {
  				$listagem.append('<div class="col-4"><div class="card card-arquivo"><div class="row no-gutters"><div class="col-md-3"><img src="./images/serie.jpg%>" class="card-img" alt="..."></div><div class="col-md-9" style=" display: flex;align-items: center;"><div class="card-body"><div class="row no-gutters"><div class="col-md-12"><a href="#" class="card-link" data-id="'+ this.id +'"><h6 class="card-title text-bold">' + this.titulo + '</h6></a></div></div></div></div></div></div></div>');
  			});
  		}
  	});
  }

  // ABRIR TELA DE VISUALIZAR
	function verSerie(event){
		event.preventDefault();
		var thisId = $(this).data('id');
		$(location).attr('href', '/series/ver/'+ thisId);
	}

	// ABRIR TELA DE NOVO
	function novaSerie(){
	 	$(location).attr('href', '/series/new');
	}
}