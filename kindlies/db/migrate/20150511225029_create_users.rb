class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :lat
      t.string :long
      t.integer :rank

      t.timestamps null: false
    end
  end
end
