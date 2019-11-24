class FilmesController < ApplicationController
	before_action :set_filme, only: [:show, :edit, :update, :destroy]

  # GET /filmes
  # GET /filmes.json
  def index
    @filmes = Filme.where(ativo: true, usuario_id: current_usuario.id)
  	render json: @filmes
  end

  # GET /filmes/1
  # GET /filmes/1.json
  def show
    @filme = Filme.joins(:formato).select("formatos.descricao, formatos.id").select(:titulo, :duracao, :ano).find(params[:id])  
    render json: @filme
  end

  # POST /filmes
  # POST /filmes.json
  def create
    @filme = Filme.new
    @filme.titulo = params[:filme][:titulo]
    @filme.formato_id = Integer(params[:filme][:formato])
    @filme.ano = Integer(params[:filme][:ano])
    @filme.duracao = Integer(params[:filme][:duracao])
    @filme.usuario_id = Integer(params[:filme][:usuario])

    if @filme.save
      render json:  @filme
    else
      render json: @filme.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /filmes/1
  # PATCH/PUT /filmes/1.json
  def update
    if @filme.update(titulo: params[:filme][:titulo], formato_id: Integer(params[:filme][:formato]), ano: Integer(params[:filme][:ano]),duracao: Integer(params[:filme][:duracao]))
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_filme
      @filme = Filme.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def filme_params
      params.require(:filme).permit(:titulo,:duracao, :ano, :formato, :usuario, :ativo)
    end
end
