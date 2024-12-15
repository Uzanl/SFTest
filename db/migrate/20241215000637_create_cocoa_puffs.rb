class CreateCocoaPuffs < ActiveRecord::Migration[8.0]
  def change
    create_table :cocoa_puffs do |t|
      t.string :name
      t.boolean :archived

      t.timestamps
    end
  end
end
