class RemoveImageFromTableHand < ActiveRecord::Migration
  def change
    remove_column :hands, :image
  end
end
