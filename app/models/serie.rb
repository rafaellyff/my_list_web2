class Serie < ApplicationRecord
  include ImageUploader::Attachment.new(:foto)

  belongs_to :formato
  belongs_to :usuario
  has_many :episodios, dependent: :destroy
  has_many :categoria_series, dependent: :destroy

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
