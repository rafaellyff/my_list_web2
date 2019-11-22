if( window.location.pathname.match(/categoria/)){
	$(document).ready(function() {
		if( window.location.pathname.match(/listagem/)){
			listagemCategoria();
		} else if ( window.location.pathname.match(/edit/)) {
			formEditarCategoria();
		} else if (window.location.pathname.match(/ver/)){
			preencherVerCategoria();
		}
		// AÇÕES DA TABELA DE LISTAGEM
		$('#listagemCategoria').on('click', '.btnVer', verCategoria);
		$('#listagemCategoria').on('click', '.btnDeletar', deletarCategoria);
		$('#listagemCategoria').on('click', '.btnEditar', editarCategoria);

		// TELA DE NOVO
		$('#novaCategoria').on('click', novaCategoria);

		// BTN FORM EDITAR 
		$('#alterarCategoria').on('click', atualizarCategoria);
		// VOLTAR LISTAGEM
		$('.voltarCategoria').on('click', voltarCategoria);
		// BTN FORM SALVAR
		$('#salvarCategoria').on('click', adicionarCategoria);
	});


	function formEditarCategoria(event){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/categorias/' + id).done(function(data) {
			$('#descricao').val(data.descricao);
		})
	}

	// ATUALIZAR REGISTRO
	function atualizarCategoria(event){
		event.preventDefault();
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		var descricao = $('#descricao').val();
		if (descricao != "" ) {
			var categoria = { 'descricao': descricao};
			categoria = { "categoria": categoria}
			$.ajax({
				type: 'PUT',
				data: categoria,
				url: '/categorias/'+id,
				dataType:"json",
			}).done(function( response ) {
				$(location).attr('href', '/categorias/ver/'+response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};

	// VOLTAR PARA A TELA DE LISTAGEM
	function voltarCategoria(){
		$(location).attr('href', '/categorias/listagem');
	}

	// PREENCHER TELA DE VISUALIZAR 
	function preencherVerCategoria(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/categorias/' + id).done(function(data) {
			$('#descricao').text(data.descricao);
		});
	}

	// ADICIONAR REGISTRO
	function adicionarCategoria(event) {
		event.preventDefault();
		var descricao = $('#descricao').val();
		if (descricao != "") {
			var categoria = { 'descricao': descricao };
			categoria = { "categoria": categoria }
			$.ajax({
				type: 'POST',
				data: categoria,
				url: '/categorias',
				dataType:"json",
			}).done(function( response ) {
				$(location).attr('href', '/categorias/ver/'+ response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};

	// LISTAGEM DE CATEGORIA
	function listagemCategoria(){
		var $listagem = $('#listagemCategoria'); 
		$.ajax({  
			type: 'GET',
			dataType: 'json',
			url: '/categorias',
			success: function(categorias){
				$.each(categorias, function(i, categoria) {
					$listagem.append('<tr><td>'+this.descricao+'</td><td><a href="#" class="btn btn-light btnVer" data-id="' + this.id + '">Visualizar</a></td><td><a href="#" class="btn btn-light btnEditar" data-id="' + this.id + '">Editar</a></td><td><a href="#" class="btn btn-danger text-white btnDeletar" data-id="' + this.id + '">Deletar</a></td></tr>');
				});
			}
		});
	}

	// DELETAR ITEM
	function deletarCategoria(event) {
		event.preventDefault();
		var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
		if (confirmation === true) {
			$.ajax({
				type: 'DELETE',
				url: '/categorias/' + $(this).data('id')
			}).done(function( response ) {
				location.reload(true);
			});
		}else {
			return false;
		}
	};

	// ABRIR TELA DE VISUALIZAR
	function verCategoria(event){
		event.preventDefault();
		var thisId = $(this).data('id');
		$(location).attr('href', '/categorias/ver/'+ thisId);
	}

	// ABRIR TELA DE NOVO
	function novaCategoria(){
		$(location).attr('href', '/categorias/new');
	}

	// ABRIR TELA DE EDITAR 
	function editarCategoria(event){
		event.preventDefault();
		var thisId = $(this).data('id');
		$(location).attr('href', '/categorias/'+ thisId+'/edit');
	}

}