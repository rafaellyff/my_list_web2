class FormatosController < ApplicationController
	before_action :set_formato, only: [:show, :edit, :update, :destroy]

  # GET /formatos
  # GET /formatos.json
  def index
    @formatos = Formato.where(ativo: true)
  	
    render json: @formatos
  end

  # GET /formatos/1
  # GET /formatos/1.json
  def show
    render json: @formato
  end

  # POST /formatos
  # POST /formatos.json
  def create
    @formato = Formato.new(formato_params)
    if @formato.save
      render json:  @formato
    else
      render json: @formato.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /formatos/1
  # PATCH/PUT /formatos/1.json
  def update
    if @formato.update(formato_params)
      render json:  @formato
    else
      render json: @formato.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /formatos/1
  # DELETE /formatos/1.json
  def destroy
    @formato.update(ativo: false)
    render json: @formato
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_formato
      @formato = Formato.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def formato_params
      params.require(:formato).permit(:descricao, :ativo)
    end
end
