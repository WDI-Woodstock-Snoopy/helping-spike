class AddImageToHands < ActiveRecord::Migration
  def change
    add_column :hands, :image, :string
  end
end
