if( window.location.pathname.match(/filmes/)){
	$(document).ready(function() {
		if( window.location.pathname.match(/listagem/)){
			listagemFilme();
		} else if ( window.location.pathname.match(/edit/)) {
			selectFormato()
			formEditarFilme();
		} else if (window.location.pathname.match(/ver/)){
			preencherVerFilme();
			selectCategoria();
			listaCategoria();
		}else if (window.location.pathname.match(/new/)){
			selectFormato()
		}

		// BTN EDITAR FILME
		$('.editarFilme').on('click', editarFilme);
		// BTN FORM EDITAR 
		$('#alterarFilme').on('click', atualizarFilme);
		// VOLTAR SHOW
		$('.voltarFormFilme').on('click', voltarFormFilme);
		// VOLTAR LISTAGEM
		$('.voltarFilme').on('click', voltarFilme);
		
		// CATEGORIAS DO FILME
		$('#adicionarCategoriaFilme').on('click', adicionarCategoriaFilme);
		$('#lista_categorias').on('click', '.closeCategoria', excluirCategoriaFilme);

		// BTN EXCLUIR FILME
		$('.excluirFilme').on('click', deletarFilme);

		// BTN FORM SALVAR
		$('#salvarFilme').on('click', adicionarFilme);
		// VOLTAR LISTAGEM
		$('.voltarFilme').on('click', voltarFilme);
		// TELA DE NOVO
		$('#novoFilme').on('click', novoFilme);
		// VER FILME
		$('#listagemFilme').on('click', '.card-link', verFilme);
	});


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
	function adicionarFilme(event) {
		event.preventDefault();
		var formFilme = new FormData();
		var titulo = $('#titulo').val();
		var ano = $('#ano').val();
		var duracao = $('#duracao').val();
		var formato = $('#formato').val();
		var usuario = $('#usuario').val();
		var foto = $('#foto').prop('files')[0];

		if (titulo != "" && ano != "" && duracao != "" && formato != "") {
			formFilme.append('titulo', titulo);
			formFilme.append('ano', ano);
			formFilme.append('duracao', duracao);
			formFilme.append('formato', formato);
			formFilme.append('usuario', usuario);
			if(foto) formFilme.append('foto', foto);

			$.ajax({
				type: 'POST',
				data: formFilme,
				url: '/filmes/',
				cache: false,
        contentType: false,
        processData: false,
			}).done(function( response ) {
				$(location).attr('href', '/filmes/ver/'+ response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};

	// VOLTAR PARA A TELA DE LISTAGEM
	function voltarFilme(){
		$(location).attr('href', '/filmes/listagem');
	}

	// ABRIR TELA DE NOVO
	function novoFilme(){
	 	$(location).attr('href', '/filmes/new');
	}

    // LISTAGEM DE FILME
    function listagemFilme(){
    	var $listagem = $('#listagemFilme'); 
    	$.ajax({  
    		type: 'GET',
    		dataType: 'json',
    		url: '/filmes',
    		success: function(filmes){
    			$.each(filmes, function(i, filme) {
						console.log(filmes)
						$listagem.append(`
							<div class="col-4">
								<div class="card card-arquivo">
									<div class="row no-gutters">
										<div class="col-md-3">
											<img src="${this.foto_url}" class="card-img" alt="...">
										</div>
										<div class="col-md-9" style=" display: flex;align-items: center;">
											<div class="card-body">
												<div class="row no-gutters">
													<div class="col-md-12">
														<a href="#" class="card-link" data-id="${this.id}">
															<h6 class="card-title text-bold">${this.titulo}</h6>
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						`);
    			});
    		}
    	});
    }

  	// ABRIR TELA DE VISUALIZAR
  	function verFilme(event){
  		event.preventDefault();
  		var thisId = $(this).data('id');
  		$(location).attr('href', '/filmes/ver/'+ thisId);
  	}

  	// DELETAR ITEM
	function deletarFilme(event) {
		event.preventDefault();
		var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
		if (confirmation === true) {
			var filme = window.location.pathname.replace(/[^0-9]/g,'');
			$.ajax({
				type: 'DELETE',
				url: '/filmes/' + filme
			}).done(function( response ) {
				voltarFilme();
			});
		}else {
			return false;
		}
	};


	// REMOVER UMA CATEGORIA DE UM FILME
	function excluirCategoriaFilme() {
		event.preventDefault();
		var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
		if (confirmation === true) {
			var filme = window.location.pathname.replace(/[^0-9]/g,'');
			var categoria = $(this).data('id');
			var categoriafilme = { 'filme_id': filme, 'categoria_id': categoria };
			categoriafilme = { "categoriafilme": categoriafilme}
			$.ajax({
				type: 'DELETE',
				data: categoriafilme,
				url: '/filmes/excluir_categoria',
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

	// ADICIONAR UMA CATEGORIA A UM FILME
	function adicionarCategoriaFilme() {
		var filme = window.location.pathname.replace(/[^0-9]/g,'');
		var categoria = $('#categoria').val();
		if (categoria != "" ) {
			var categoriafilme = { 'filme_id': filme, 'categoria_id': categoria };
			categoriafilme = { "categoriafilme": categoriafilme}
			$.ajax({
				type: 'POST',
				data: categoriafilme,
				url: '/filmes/add_categoria',
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


	// SELECT DE ADICIONAR CATEGORIA AO FILME
	function selectCategoria(){
		let dropdown = $('#categoria');
		$.getJSON('/categorias/').done(function(data) {
			$.each(data, function (i, categoria) {
				dropdown.append($('<option></option>').attr('value', categoria.id).text(categoria.descricao));
			});
		});
	}

	// ABRIR TELA DE EDITAR 
	function editarFilme(event){
		event.preventDefault();
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$(location).attr('href', '/filmes/'+ id +'/edit');
	}


	// PREENCHER TELA DE VISUALIZAR 
	function preencherVerFilme(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/filmes/' + id).done(function(data) {
			$('#ano').text(data.ano);
			$('#duracao').text(data.duracao);
			$('#titulo').text(data.titulo);
			$('#formato').text(data.descricao);
			$("#foto").attr("src", data.foto_url);
		});
	}

	// PREENCHER TELA DE VISUALIZAR 
	function listaCategoria(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/filmes/list_categoria/' + id).done(function(data) {
			var $listagem = $('#lista_categorias'); 
			$listagem.empty();
			$.each(data, function(i, categoria) {
				$listagem.append('<span class="badge badge-primary">'+ this.descricao +' &nbsp<button type="button" class="close closeCategoria" aria-label="Close"  data-id="' + this.id + '><span aria-hidden="true">&times;</span> </button></span> &nbsp');
			});
		});
	}

	// SELECT PARA ADICIONAR UMA CATEGORIA AO FILME
	function selectCategoria(){
		let dropdown = $('#categoria');
		$.getJSON('/categorias/').done(function(data) {
			$.each(data, function (i, categoria) {
    		dropdown.append($('<option></option>').attr('value', categoria.id).text(categoria.descricao));
    	});
		});
	}

	// PREENCHER FORM DE EDITAR FILME
	function formEditarFilme(event){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/filmes/' + id).done(function(data) {
			$('#ano').val(data.ano);
			$('#titulo').val(data.titulo);
			$('#formato').val(data.id);
			$('#duracao').val(data.duracao);
		})
	}


	// ATUALIZAR REGISTRO
	function atualizarFilme(event){
		event.preventDefault();
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		var formFilme = new FormData();
		var titulo = $('#titulo').val();
		var ano = $('#ano').val();
		var duracao = $('#duracao').val();
		var formato = $('#formato').val();
		var foto = $('#foto').prop('files')[0];

		if (titulo != "" && ano != "" && duracao != "" && formato != "") {
			formFilme.append('titulo', titulo);
			formFilme.append('ano', ano);
			formFilme.append('duracao', duracao);
			formFilme.append('formato', formato);
			if (foto) formFilme.append('foto', foto);

			$.ajax({
				type: 'PUT',
				data: formFilme,
				url: '/filmes/'+id,
				cache: false,
        contentType: false,
        processData: false,
			}).done(function( response ) {
				$(location).attr('href', '/filmes/ver/'+response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};

	// VOLTAR PARA A TELA DE SHOW
	function voltarFormFilme(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$(location).attr('href', '/filmes/ver/' + id);
	}


}