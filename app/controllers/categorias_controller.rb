class CategoriasController < ApplicationController
  before_action :set_categoria, only: [:show, :edit, :update, :destroy]

  # GET /categorias
  # GET /categorias.json
  def index
    @categorias = Categoria.where(ativo: true)
  	
    render json: @categorias
  end

  # GET /categorias/1
  # GET /categorias/1.json
  def show
    render json: @categoria
  end

  # POST /categorias
  # POST /categorias.json
  def create
    @categoria = Categoria.new(categoria_params)
    if @categoria.save
      render json:  @categoria
    else
      render json: @categoria.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /categorias/1
  # PATCH/PUT /categorias/1.json
  def update
    if @categoria.update(categoria_params)
      render json:  @categoria
    else
      render json: @categoria.errors, status: :unprocessable_entity 
    end
  end

  # DELETE /categorias/1
  # DELETE /categorias/1.json
  def destroy
    @categoria.update(ativo: false)
    render json: @categoria
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_categoria
      @categoria = Categoria.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def categoria_params
      params.require(:categoria).permit(:descricao, :ativo)
    end
end
