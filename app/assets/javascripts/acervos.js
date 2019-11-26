if( window.location.pathname.match(/acervos/)){
	$(document).ready(function() {
		if( window.location.pathname.match(/acervo_amigos/)){
			listagemUsuarios();
		} else if( window.location.pathname.match(/usuario_lista/)){
			preencherVerUsuario();
			listagemFilme();
			listagemSerie();
		} 
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
				$listagem.append('<div class="col-3"><div class="card card-arquivo"><div class="row no-gutters"><div class="col-md-12" style=" display: flex;align-items: center;"><div class="card-body"><div class="row no-gutters"><div class="col-md-12"><a href="#" class="card-link" data-id="'+ this.id +'"><h6 class="card-title text-bold">' + this.nome + '</h6></a></div></div></div></div></div></div></div>');
			});
		}
	});
}

// PREENCHER TELA DE VISUALIZAR - USUÁRIO
function preencherVerUsuario(){
	var id = 1;
	$.getJSON('/acervos/ver_usuario/' + id).done(function(data) {
		$('#nome').text(data.nome);
		$('#login').text(data.login);
		$('#email').text(data.email);
	});
}

// LISTAGEM DE FILME
function listagemFilme(){
	var id = 1;
	var $listagem = $('#listaUsuarioFilme'); 
	$.ajax({  
		type: 'GET',
		dataType: 'json',
		url: '/acervos/filmes_usuario/'+ id,
		success: function(filmes){
			$.each(filmes, function(i, filme) {
				$listagem.append('<div class="col-4"><div class="card card-arquivo"><div class="row no-gutters"><div class="col-md-3"><img src="./images/filme.jpg%>" class="card-img" alt="..."></div><div class="col-md-9" style=" display: flex;align-items: center;"><div class="card-body"><div class="row no-gutters"><div class="col-md-12"><a href="#" class="card-link" data-id="'+ this.id +'"><h6 class="card-title text-bold">' + this.titulo + '</h6></a></div></div></div></div></div></div></div>');
			});
		}
	});
}

// LISTAGEM DE SERIE
function listagemSerie(){
	var id = 1;
	var $listagem = $('#listaUsuarioSerie'); 
	$.ajax({  
		type: 'GET',
		dataType: 'json',
		url: '/acervos/series_usuario/'+ id,
		success: function(filmes){
			$.each(filmes, function(i, filme) {
				$listagem.append('<div class="col-4"><div class="card card-arquivo"><div class="row no-gutters"><div class="col-md-3"><img src="./images/filme.jpg%>" class="card-img" alt="..."></div><div class="col-md-9" style=" display: flex;align-items: center;"><div class="card-body"><div class="row no-gutters"><div class="col-md-12"><a href="#" class="card-link" data-id="'+ this.id +'"><h6 class="card-title text-bold">' + this.titulo + '</h6></a></div></div></div></div></div></div></div>');
			});
		}
	});
}




// MODAL VER FILME


// PREENCHER TELA DE VISUALIZAR 
function listaCategoria(filme_id){
	var id = filme_id;
	$.getJSON('/filmes/list_categoria/' + id).done(function(data) {
		var $listagem = $('#lista_categorias'); 
		$listagem.empty();
		$.each(data, function(i, categoria) {
			$listagem.append('<span class="badge badge-primary">'+ this.descricao +');		});
		});
	});
}