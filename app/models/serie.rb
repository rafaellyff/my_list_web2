class Serie < ApplicationRecord
  include ImageUploader::Attachment.new(:foto)

  belongs_to :formato
  belongs_to :usuario
end
