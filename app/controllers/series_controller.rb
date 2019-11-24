class SeriesController < ApplicationController
	before_action :set_serie, only: [:show, :edit, :update, :destroy]

  # GET /series
  # GET /series.json
  def index
  	@series = Serie.where(ativo: true)
  	
    render json: @series
  end

  # GET /series/1
  # GET /series/1.json
  def show
    @serie = Serie.joins(:formato).select("formatos.descricao, formatos.id").select(:titulo).find(params[:id])  
    render json: @serie
  end

  # POST /series
  # POST /series.json
  def create
    @serie = Serie.new
    @serie.titulo = params[:serie][:titulo]
    @serie.formato_id = Integer(params[:serie][:formato])
    @serie.usuario_id = Integer(params[:serie][:usuario])

    if @serie.save
      render json:  @serie
    else
      render json: @serie.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /series/1
  # PATCH/PUT /series/1.json
  def update
    if @serie.update(titulo: params[:serie][:titulo], formato_id: Integer(params[:serie][:formato]))
      render json:  @serie
    else
      render json: @serie.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /series/1
  # DELETE /series/1.json
  def destroy
    @serie.update(ativo: false)
    render json: @serie
  end

  def add_categoria
    categoria_serie = CategoriaSerie.new
    categoria_serie.serie_id = params[:categoriaserie][:serie_id]
    categoria_serie.categoria_id = params[:categoriaserie][:categoria_id]
    categoria_serie.save

    categorias = CategoriaSerie.joins(:categoria).where(serie_id: params[:categoriaserie][:serie_id]).select("categorias.descricao").select(:id)
    render json: categorias
  end

  def excluir_categoria
    categoria = CategoriaSerie.find(params[:categoriaserie][:categoria_id])
    categoria.destroy

    categorias = CategoriaSerie.joins(:categoria).where(serie_id: params[:categoriaserie][:serie_id]).select("categorias.descricao").select(:id)
    render json: categorias
  end

  def list_categoria
    categorias = CategoriaSerie.joins(:categoria).where(serie_id: params[:id]).select("categorias.descricao").select(:id)
    render json: categorias    
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_serie
      @serie = Serie.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def serie_params
      params.require(:serie).permit(:titulo,:formato, :usuario, :ativo)
    end
end
