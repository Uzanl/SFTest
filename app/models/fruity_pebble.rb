class FruityPebble < ApplicationRecord
  belongs_to :cocoa_puff
  validates :name, presence: true
  validates :pebble_count, numericality: { greater_than_or_equal_to: 10 }
end
