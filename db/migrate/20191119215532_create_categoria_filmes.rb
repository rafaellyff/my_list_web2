class CreateCategoriaFilmes < ActiveRecord::Migration[5.2]
  def change
    create_table :categoria_filmes do |t|
      t.references :filme, foreign_key: true
      t.references :categoria, foreign_key: true
      t.boolean :ativo, default: true

      t.timestamps
    end
  end
end
