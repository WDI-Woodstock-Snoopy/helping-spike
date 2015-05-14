class AddImageToHands < ActiveRecord::Migration
  def change
    add_column :hands, :image, :text
  end
end
