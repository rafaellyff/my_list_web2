class Filme < ApplicationRecord
  belongs_to :formato
  belongs_to :usuario
end
