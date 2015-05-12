class AddLongToHands < ActiveRecord::Migration
  def change
    add_column :hands, :long, :string
  end
end
