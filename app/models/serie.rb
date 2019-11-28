class Serie < ApplicationRecord
  include ImageUploader::Attachment.new(:foto)

  belongs_to :formato
  belongs_to :usuario

  def encode
    hash = {
      id: id,
      titulo: titulo,
      foto_url: foto_url,
      formato: formato.descricao,
      usuario: usuario.nome
    }
    hash
  end
end
