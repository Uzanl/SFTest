class CreateFruityPebbles < ActiveRecord::Migration[8.0]
  def change
    create_table :fruity_pebbles do |t|
      t.string :name
      t.integer :pebble_count
      t.references :cocoa_puff, null: false, foreign_key: true

      t.timestamps
    end
  end
end
