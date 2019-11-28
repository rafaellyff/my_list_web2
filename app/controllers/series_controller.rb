class SeriesController < ApplicationController
	before_action :set_serie, only: [:show, :edit, :update, :destroy]

  # GET /series
  # GET /series.json
  def index
    @series = Serie.where(ativo: true).where(usuario: current_usuario)
    render json: @series.map(&:encode)
  end

  # GET /series/1
  # GET /series/1.json
  def show
    @serie = Serie.joins(:formato).select("formatos.descricao, formatos.id").select(:titulo, :foto_data).find(params[:id])  
    response = @serie.as_json
    response[:foto_url] = @serie.foto_url
    render json: response
  end

  # POST /series
  # POST /series.json
  def create
    @serie = resource_params
    if @serie.save
      render json:  @serie
    else
      render json: @serie.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /series/1
  # PATCH/PUT /series/1.json
  def update
    @serie = resource_params
    if @serie.save
      render json: @serie
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

  protected

  def resource_params
    serie = Serie.new
    serie = Serie.find params[:id] if params[:id].present?
    serie.titulo = params[:titulo] if params[:titulo].present?
    serie.formato_id = Integer(params[:formato]) if params[:formato].present?
    serie.usuario_id = Integer(params[:usuario]) if params[:usuario].present?
    serie.foto = params[:foto] if params[:foto].present?
    serie
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_serie
      @serie = Serie.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def serie_params
      params.permit(:serie, :titulo, :formato, :usuario, :ativo, :foto)
    end
end
