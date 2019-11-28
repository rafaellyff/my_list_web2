class Filme < ApplicationRecord
  include ImageUploader::Attachment.new(:foto)
  
  belongs_to :formato
  belongs_to :usuario
  has_many :categoria_filmes, dependent: :destroy

  def encode
    hash = {
      id: id,
      ano: ano,
      titulo: titulo,
      duracao: duracao,
      foto_url: foto_url,
      formato: formato.descricao,
      usuario: usuario.nome
    }
    hash
  end
end
