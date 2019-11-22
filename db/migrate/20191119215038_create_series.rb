class CreateSeries < ActiveRecord::Migration[5.2]
  def change
    create_table :series do |t|
      t.string :titulo
      t.string :foto
      t.references :formato, foreign_key: true
      t.references :usuario, foreign_key: true
      t.boolean :ativo, default: true

      t.timestamps
    end
  end
end
