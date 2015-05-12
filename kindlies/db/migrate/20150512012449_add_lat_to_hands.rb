class AddLatToHands < ActiveRecord::Migration
  def change
    add_column :hands, :lat, :string
  end
end
