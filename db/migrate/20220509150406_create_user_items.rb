class CreateUserItems < ActiveRecord::Migration[6.1]
  def change
    create_table :user_items do |t|
      t.references :user
      t.references :bot
      t.timestamps
    end
  end
end
