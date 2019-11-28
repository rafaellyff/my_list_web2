Rails.application.routes.draw do
	devise_for :usuarios
  	# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  	resources :categorias do
	  	collection do 
	  		match "listagem", via: :get
			match "ver/:id", to: "categorias#ver", via: :get
	  	end
	  end
  	resources :formatos do
	  	collection do 
	  		match "listagem", via: :get
			match "ver/:id", to: "formatos#ver", via: :get
	  	end
	  end

  	resources :filmes do
  		collection do
  			match "listagem", via: :get
  			match "list_categoria/:id", to: "filmes#list_categoria", via: :get
	  		match "add_categoria", via: :post
	  		match "excluir_categoria", via: :delete
  			match "ver/:id", to: "filmes#ver", via: :get
  		end
  	end
  	resources :series do
  		collection do
  			match "listagem", via: :get
  			match "list_categoria/:id", to: "series#list_categoria", via: :get
	  		match "add_categoria", via: :post
	  		match "excluir_categoria", via: :delete
  			match "ver/:id", to: "series#ver", via: :get
  		end
  	end

  resources :episodios
	
  get 'acervos/usuarios'
  get 'acervos/acervo_amigos'
  get 'acervos/usuario_lista'
  match "acervos/ver_usuario/:id", to: "acervos#ver_usuario", via: :get
  match "acervos/filmes_usuario/:id", to: "acervos#filmes_usuario", via: :get
  match "acervos/series_usuario/:id", to: "acervos#series_usuario", via: :get

	get '/info/current_usuario', to: 'usuarios#user', as: :user

  root to: 'filmes#listagem'
end
