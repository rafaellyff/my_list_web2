class FilmesController < ApplicationController
	before_action :set_filme, only: [:show, :edit, :update, :destroy]

  # GET /filmes
  # GET /filmes.json
  def index
    @filmes = Filme.where(ativo: true, usuario_id: current_usuario.id)
  	render json: @filmes.map(&:encode)
  end

  # GET /filmes/1
  # GET /filmes/1.json
  def show
    @filme = Filme.joins(:formato).select("formatos.descricao").select(:titulo, :duracao, :ano, :foto_data, :id).find(params[:id])  
    response = @filme.as_json
    response[:foto_url] = @filme.foto_url
    render json: response
  end

  # POST /filmes
  # POST /filmes.json
  def create
    @filme = resource_params
    if @filme.save
      render json:  @filme
    else
      render json: @filme.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /filmes/1
  # PATCH/PUT /filmes/1.json
  def update
    @filme = resource_params
    if @filme.save
      render json:  @filme
    else
      render json: @filme.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /filmes/1
  # DELETE /filmes/1.json
  def destroy
    @filme.update(ativo: false)
    render json: @filme
  end

  def add_categoria
    categoria_filme = CategoriaFilme.new
    categoria_filme.filme_id = params[:categoriafilme][:filme_id]
    categoria_filme.categoria_id = params[:categoriafilme][:categoria_id]
    categoria_filme.save

    categorias = CategoriaFilme.joins(:categoria).where(filme_id: params[:categoriafilme][:filme_id]).select("categorias.descricao").select(:id)
    render json: categorias
  end

  def excluir_categoria
    categoria = CategoriaFilme.find(params[:categoriafilme][:categoria_id])
    categoria.destroy

    categorias = CategoriaFilme.joins(:categoria).where(filme_id: params[:categoriafilme][:filme_id]).select("categorias.descricao").select(:id)
    render json: categorias
  end

  def list_categoria
    categorias = CategoriaFilme.joins(:categoria).where(filme_id: params[:id]).select("categorias.descricao").select(:id)
    render json: categorias    
  end

  protected

  def resource_params
    filme = Filme.new
    filme = Filme.find params[:id] if params[:id].present?
    filme.titulo = params[:titulo] if params[:titulo].present?
    filme.formato_id = Integer(params[:formato]) if params[:formato].present?
    filme.ano = Integer(params[:ano]) if params[:ano].present?
    filme.duracao = Integer(params[:duracao]) if params[:duracao].present?
    filme.usuario_id = Integer(params[:usuario]) if params[:usuario].present?
    filme.foto = params[:foto] if params[:foto].present?
    filme
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_filme
      @filme = Filme.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def filme_params
      params.permit(:filme, :titulo, :duracao, :ano, :formato, :usuario, :ativo, :foto)
    end
end
