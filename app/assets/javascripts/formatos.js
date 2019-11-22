if( window.location.pathname.match(/formato/)){
	$(document).ready(function() {
		if( window.location.pathname.match(/listagem/)){
			listagemFormato();
		} else if ( window.location.pathname.match(/edit/)) {
			formEditarFormato();
		} else if (window.location.pathname.match(/ver/)){
			preencherVerFormato();
		}
		// AÇÕES DA TABELA DE LISTAGEM
		$('#listagemFormato').on('click', '.btnVer', verFormato);
		$('#listagemFormato').on('click', '.btnDeletar', deletarFormato);
		$('#listagemFormato').on('click', '.btnEditar', editarFormato);

		// TELA DE NOVO
		$('#novoFormato').on('click', novoFormato);

		// BTN FORM EDITAR 
		$('#alterarFormato').on('click', atualizarFormato);
		// VOLTAR LISTAGEM
		$('.voltarFormato').on('click', voltarFormato);
		// BTN FORM SALVAR
		$('#salvarFormato').on('click', adicionarFormato);
	});


	function formEditarFormato(event){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/formatos/' + id).done(function(data) {
			$('#descricao').val(data.descricao);
		})
	}

	// ATUALIZAR REGISTRO
	function atualizarFormato(event){
		event.preventDefault();
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		var descricao = $('#descricao').val();
		if (descricao != "" ) {
			var formato = { 'descricao': descricao};
			formato = { "formato": formato}
			$.ajax({
				type: 'PUT',
				data: formato,
				url: '/formatos/'+id,
				dataType:"json",
			}).done(function( response ) {
				$(location).attr('href', '/formatos/ver/'+response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};

	// VOLTAR PARA A TELA DE LISTAGEM
	function voltarFormato(){
		$(location).attr('href', '/formatos/listagem');
	}

	// PREENCHER TELA DE VISUALIZAR 
	function preencherVerFormato(){
		var id = window.location.pathname.replace(/[^0-9]/g,'');
		$.getJSON('/formatos/' + id).done(function(data) {
			$('#descricao').text(data.descricao);
		});
	}

	// ADICIONAR REGISTRO
	function adicionarFormato(event) {
		event.preventDefault();
		var descricao = $('#descricao').val();
		if (descricao != "") {
			var formato = { 'descricao': descricao };
			formato = { "formato": formato }
			$.ajax({
				type: 'POST',
				data: formato,
				url: '/formatos',
				dataType:"json",
			}).done(function( response ) {
				$(location).attr('href', '/formatos/ver/'+ response.id);
			});
		} else {
			alert("Nenhum dos campos pode ficar vazio!")
		}
	};

	// LISTAGEM DE FORMATO
	function listagemFormato(){
		var $listagem = $('#listagemFormato'); 
		$.ajax({  
			type: 'GET',
			dataType: 'json',
			url: '/formatos',
			success: function(formatos){
				$.each(formatos, function(i, formato) {
					$listagem.append('<tr><td>'+this.descricao+'</td><td><a href="#" class="btn btn-light btnVer" data-id="' + this.id + '">Visualizar</a></td><td><a href="#" class="btn btn-light btnEditar" data-id="' + this.id + '">Editar</a></td><td><a href="#" class="btn btn-danger text-white btnDeletar" data-id="' + this.id + '">Deletar</a></td></tr>');
				});
			}
		});
	}

	// DELETAR ITEM
	function deletarFormato(event) {
		event.preventDefault();
		var confirmation = confirm('Você tem certeza que deseja excluir esse registro?');
		if (confirmation === true) {
			$.ajax({
				type: 'DELETE',
				url: '/formatos/' + $(this).data('id')
			}).done(function( response ) {
				location.reload(true);
			});
		}else {
			return false;
		}
	};

	// ABRIR TELA DE VISUALIZAR
	function verFormato(event){
		event.preventDefault();
		var thisId = $(this).data('id');
		$(location).attr('href', '/formatos/ver/'+ thisId);
	}

	// ABRIR TELA DE NOVO
	function novoFormato(){
		$(location).attr('href', '/formatos/new');
	}

	// ABRIR TELA DE EDITAR 
	function editarFormato(event){
		event.preventDefault();
		var thisId = $(this).data('id');
		$(location).attr('href', '/formatos/'+ thisId+'/edit');
	}

}