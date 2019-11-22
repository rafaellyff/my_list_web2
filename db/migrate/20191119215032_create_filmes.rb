class CreateFilmes < ActiveRecord::Migration[5.2]
  def change
    create_table :filmes do |t|
      t.string :titulo
      t.integer :duracao
      t.string :foto
      t.integer :ano
      t.references :formato, foreign_key: true
      t.references :usuario, foreign_key: true
      t.boolean :ativo, default: true

      t.timestamps
    end
  end
end
