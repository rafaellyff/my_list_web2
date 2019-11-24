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
  	resources :series 
  	resources :episodios 


	root to: 'filmes#listagem'
end
