class FilmesController < ApplicationController
	before_action :set_filme, only: [:show, :edit, :update, :destroy]

  # GET /filmes
  # GET /filmes.json
  def index
    @filmes = Filme.where(ativo: true)
  	
    render json: @filmes
  end

  # GET /filmes/1
  # GET /filmes/1.json
  def show
    render json: @filme
  end

  # POST /filmes
  # POST /filmes.json
  def create
    @filme = Filme.new(filme_params)
    if @filme.save
      render json:  @filme
    else
      render json: @filme.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /filmes/1
  # PATCH/PUT /filmes/1.json
  def update
    if @filme.update(filme_params)
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
