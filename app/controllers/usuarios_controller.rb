class UsuariosController < ApplicationController
  def user
    render json: current_usuario
  end
end
