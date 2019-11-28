if( window.location.pathname.match(/acervos/)){
	$(document).ready(function() {
		if( window.location.pathname.match(/acervo_amigos/)){
			listagemUsuarios();
		} else if( window.location.pathname.match(/usuario_lista/)){
			preencherVerUsuario();
			listagemFilme();
			listagemSerie();
		} 

		// VER ACERVO DE UM USUÁRIO
		$('#listagemUsuarios').on('click', '.btnVerAcervo', definirUsuarioAcervo);

		$('#listaUsuarioFilme').on('click', '.btnModalFilme', preencherVerFilmeModal);
		$('#listaUsuarioSerie').on('click', '.btnModalSerie', preencherVerSerieModal);
	});
}

// LISTAGEM DE USUÁRIOS
function listagemUsuarios(){
	var $listagem = $('#listagemUsuarios'); 
	$.ajax({  
		type: 'GET',
		dataType: 'json',
		url: '/acervos/usuarios',
		success: function(usuarios){
			$.each(usuarios, function(i, usuario) {
				$listagem.append('<div class="col-3"><div class="card card-arquivo"><div class="row no-gutters"><div class="col-md-12" style=" display: flex;align-items: center;"><div class="card-body"><div class="row no-gutters"><div class="col-md-12"><a href="#" class="card-link btnVerAcervo" data-id="'+ this.id +'"><h6 class="card-title text-bold">' + this.nome + '</h6></a></div></div></div></div></div></div></div>');
			});
		}
	});
}

// PREENCHER TELA DE VISUALIZAR - USUÁRIO
function preencherVerUsuario(){
	var id = localStorage.getItem("usu_acervo_id");
	$.getJSON('/acervos/ver_usuario/' + id).done(function(data) {
		$('#nome').text(data.nome);
		$('#login').text(data.login);
		$('#email').text(data.email);
	});
}

// LISTAGEM DE FILME
function listagemFilme(){
	var id = localStorage.getItem("usu_acervo_id");
	var $listagem = $('#listaUsuarioFilme'); 
	$.ajax({  
		type: 'GET',
		dataType: 'json',
		url: '/acervos/filmes_usuario/'+ id,
		success: function(filmes){
			console.log(filmes)
			$.each(filmes, function(i, filme) {
				$listagem.append('<div class="col-4"><div class="card card-arquivo"><div class="row no-gutters"><div class="col-md-3"><img src="' + this.foto_url +'" class="card-img" alt="..."></div><div class="col-md-9" style=" display: flex;align-items: center;"><div class="card-body"><div class="row no-gutters"><div class="col-md-12"><a href="#" class="card-link btnModalFilme" data-id="'+ this.id +'"><h6 class="card-title text-bold">' + this.titulo + '</h6></a></div></div></div></div></div></div></div>');
			});
		}
	});
}

// LISTAGEM DE SERIE
function listagemSerie(){
	var id = localStorage.getItem("usu_acervo_id");
	var $listagem = $('#listaUsuarioSerie'); 
	$.ajax({  
		type: 'GET',
		dataType: 'json',
		url: '/acervos/series_usuario/'+ id,
		success: function(filmes){
			$.each(filmes, function(i, filme) {
				$listagem.append('<div class="col-4"><div class="card card-arquivo"><div class="row no-gutters"><div class="col-md-3"><img src=" ' + this.foto_url + '" class="card-img" alt="..."></div><div class="col-md-9" style=" display: flex;align-items: center;"><div class="card-body"><div class="row no-gutters"><div class="col-md-12"><a href="#" class="card-link btnModalSerie" data-id="'+ this.id +'"><h6 class="card-title text-bold">' + this.titulo + '</h6></a></div></div></div></div></div></div></div>');
			});
		}
	});
}




// MODAL VER FILME

function preencherVerFilmeModal(event) {
	event.preventDefault();
	var thisId = $(this).data('id');
	$.getJSON('/filmes/' + thisId).done(function(data) {
		$('#imgFilmeAcervo').attr("src", data.foto_url);
		$('#tituloFilmeAcervo').text(data.titulo);
		$('#duracaoFilmeAcervo').text(data.duracao);
		$('#formatoFilmeAcervo').text(data.descricao);
		$('#anoFilmeAcervo').text(data.descricao);
		
	});
	$.getJSON('/filmes/list_categoria/' + thisId).done(function(data) {
		var $listagem = $('#lista_categoriasFilmeAcervo'); 
		$listagem.empty();
		$.each(data, function(i, categoria) {
			$listagem.append('<span class="badge badge-primary">'+ this.descricao+ '</span>&nbsp');
		});
	});
	$('#verFilmeModal').modal('show');
}

function preencherVerSerieModal(event) {
	event.preventDefault();

	var thisId = $(this).data('id');
	$.getJSON('/series/' + thisId).done(function(data) {
		$('#imgSerieAcervo').attr("src", data.foto_url);
		$('#tituloSerieAcervo').text(data.titulo);
		$('#formatoSerieAcervo').text(data.descricao);
		
	});
	$.getJSON('/series/list_categoria/' + thisId).done(function(data) {
		var $listagem = $('#lista_categoriasSerieAcervo'); 
		$listagem.empty();
		$.each(data, function(i, categoria) {
			$listagem.append('<span class="badge badge-primary">'+ this.descricao+ '</span>&nbsp');
		});
	});

	$.ajax({
		type: 'GET',
		data: {serie_id: thisId},
		url: '/episodios',
		dataType:"json",
	}).done(function( response ) {
	 	var $listagem = $('#listagemEpisodioAcervo'); 
		$listagem.empty();
		$.each(response, function(i, categoria) {
			$listagem.append('<tr><td>'+this.titulo+'</td><td>'+this.duracao+'</td></tr>');
		});
	});


	$('#verSerieModal').modal('show');
}

function definirUsuarioAcervo(){
	var thisId = $(this).data('id');
	localStorage.setItem("usu_acervo_id", thisId);
	$(location).attr('href', '/acervos/usuario_lista');
}