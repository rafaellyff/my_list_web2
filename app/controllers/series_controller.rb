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
    render json: @serie
  end

  # POST /series
  # POST /series.json
  def create
    @serie = Serie.new(serie_params)
    if @serie.save
      render json:  @serie
    else
      render json: @serie.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /series/1
  # PATCH/PUT /series/1.json
  def update
    if @serie.update(serie_params)
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
