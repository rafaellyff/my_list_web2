class FixColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :filmes, :foto, :foto_data
    rename_column :series, :foto, :foto_data
  end
end
