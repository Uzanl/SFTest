class FruityPebble < ApplicationRecord
  belongs_to :cocoa_puff
  validates :name, presence: true
  validates :pebble_count, numericality: {less_than: 10}
end
