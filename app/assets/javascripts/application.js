// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require turbolinks
//= require rails-ujs
//= require activestorage
//= require_tree .


$(document).on("turbolinks:load", function() {
	// BTN MENU
	$('#seuAcervo').on('click', seuAcervo);
	$('#acervoAmigos').on('click', acervoAmigos);
	$('#todosFormatos').on('click', todosFormatos);
	$('#todasCategorias').on('click', todasCategorias);
	$('#sair').on('click', sair);

	$.getJSON('/info/current_usuario').done(function(user) {
		if (user.admin) {
			$('#seuAcervoNav').detach()
			$('#acervoAmigosNav').detach()
			if (window.location.pathname === '/') $(location).attr('href', '/formatos/listagem');
		} else {
			$('#todosFormatos').detach()
			$('#todasCategorias').detach()
		}
	})
});


// TELA DE SEU ACERVO
function seuAcervo(event){
	event.preventDefault();
	$(location).attr('href', '/filmes/listagem');
}



// TELA DE ACERVO DE AMIGOS
function acervoAmigos(event){
	event.preventDefault();
	$(location).attr('href', '/acervos/acervo_amigos');
}

function todosFormatos(event){
	event.preventDefault();
	$(location).attr('href', '/formatos/listagem');
}

function todasCategorias(event){
	event.preventDefault();
	$(location).attr('href', '/categorias/listagem');
}

// SAIR
function sair(event){
	event.preventDefault();
	$(location).attr('href', '/usuarios/sign_out/');
}
