class CreateEpisodios < ActiveRecord::Migration[5.2]
  def change
    create_table :episodios do |t|
      t.string :titulo
      t.integer :duracao
      t.references :serie, foreign_key: true
      t.boolean :ativo, default: true

      t.timestamps
    end
  end
end
