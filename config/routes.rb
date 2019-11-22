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

  	resources :filmes 
  	resources :series 
  	resources :episodios 
end
