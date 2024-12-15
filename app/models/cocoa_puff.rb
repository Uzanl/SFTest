class CocoaPuff < ApplicationRecord
    has_many :fruity_pebbles, dependent: :destroy
    validates :name, presence: true, uniqueness: true
end
