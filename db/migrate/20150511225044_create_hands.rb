class CreateHands < ActiveRecord::Migration
  def change
    create_table :hands do |t|
      t.string :title
      t.string :message
      t.references :user, index: true, foreign_key: true
      t.integer :rank
      t.string :lat
      t.string :long

      t.timestamps null: false
    end
  end
end
