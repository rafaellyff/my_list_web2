class AddAdminToUsuario < ActiveRecord::Migration[5.2]
  def change
    add_column :usuarios, :admin, :boolean, default: false
  end
end
