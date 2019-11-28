class ImageUploader < Shrine
  plugin :remove_attachment

  Attacher.validate do
    validate_max_size 15.megabyte, message: 'is too large (max is 15 MB)'
    validate_mime_type_inclusion w%['image/png image/jpg image/jpeg']
  end
end
