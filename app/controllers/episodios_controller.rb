class EpisodiosController < ApplicationController
	before_action :set_episodio, only: [:show, :edit, :update, :destroy]

  # GET /episodios
  # GET /episodios.json
  def index
  	@episodios = Episodio.where(serie_id: params[:serie_id],ativo: true)
    render json: @episodios
  end


  def show
    render json: @episodio
  end
  
  # POST /episodios
  # POST /episodios.json
  def create
    @episodio = Episodio.new
    @episodio.titulo = params[:episodio][:titulo]
    @episodio.duracao = params[:episodio][:duracao]
    @episodio.serie_id = Integer(params[:episodio][:serie_id])
    if @episodio.save
      @episodios = Episodio.where(serie_id: params[:episodio][:serie_id],ativo: true)
      render json: @episodios
    else
      render json: @episodio.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /episodios/1
  # PATCH/PUT /episodios/1.json
  def update
    if @episodio.update(episodio_params)
      @episodios = Episodio.where(serie_id: params[:episodio][:serie_id],ativo: true)
      render json: @episodios
    else
      render json: @episodio.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /episodios/1
  # DELETE /episodios/1.json
  def destroy
    @episodio.update(ativo: false)
    render json: @episodio
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_episodio
      @episodio = Episodio.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def episodio_params
      params.require(:episodio).permit(:titulo,:duracao, :serie, :ativo)
    end
end
