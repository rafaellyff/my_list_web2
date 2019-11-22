class CategoriaFilme < ApplicationRecord
  belongs_to :filme
  belongs_to :categoria
end
