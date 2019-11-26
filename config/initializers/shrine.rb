# require 'shrine'
# require 'shrine/storage/s3'
# require 'shrine/storage/file_system'

# Shrine.logger = Rails.logger

# s3_options = {
#   bucket:            ENV['AWS_S3_BUCKET'], # required
#   access_key_id:     ENV['AWS_ACCESS_KEY_ID'],
#   secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
#   region:            ENV['AWS_REGION'],
# }

# Shrine.storages = {
#   cache: Shrine::Storage::FileSystem.new('public', prefix: 'uploads/cache'),
#   store: Shrine::Storage::FileSystem.new('public', prefix: 'uploads')
# }

# Shrine.plugin :activerecord
# Shrine.plugin :upload_endpoint
# Shrine.plugin :validation_helpers
# Shrine.plugin :cached_attachment_data # for retaining the cached file across form redisplays
# Shrine.plugin :restore_cached_data # re-extract metadata when attaching a cached file
# Shrine.plugin :pretty_location
# Shrine.plugin :determine_mime_type
# Shrine.plugin :rack_file # for non-Rails apps
# Shrine.plugin :derivatives
