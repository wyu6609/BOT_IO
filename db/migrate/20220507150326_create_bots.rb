class CreateBots < ActiveRecord::Migration[6.1]
  def change
    create_table :bots do |t|
      t.string :title
      t.string :description
      t.references :category
      t.integer :price

      t.string :image
      t.timestamps
    end
  end
end
