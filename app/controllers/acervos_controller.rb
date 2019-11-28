class AcervosController < ApplicationController

	def usuarios
		@usuarios = Usuario.all
		render json: @usuarios
	end

	def ver_usuario
		@usuario = Usuario.find(params[:id])
		render json: @usuario
	end

	def filmes_usuario
		@filmes = Filme.where(ativo: true, usuario_id: params[:id])
		render json: @filmes.map(&:encode)
	end

	def series_usuario
		@series = Serie.where(ativo: true, usuario_id: params[:id])
		render json: @series.map(&:encode)
	end


end
