require 'rails_helper'

RSpec.describe FruityPebble, type: :model do
  # Testando a validação de presença para o campo 'name'
  it { should validate_presence_of(:name) }

  # Testando a validação para o campo 'pebble_count', garantindo que seja um número menor que 10
  it { should validate_numericality_of(:pebble_count).is_less_than(10) }

  # Testando a associação belongs_to com o modelo CocoaPuff
  it { should belong_to(:cocoa_puff) }

  # Testando a criação de um FruityPebble válido
  it 'is valid with valid attributes' do
    cocoa_puff = CocoaPuff.create!(name: 'Cocoa Puff', archived: false)
    fruity_pebble = FruityPebble.new(name: 'Fruity Pebble', pebble_count: 5, cocoa_puff: cocoa_puff)
    expect(fruity_pebble).to be_valid
  end

  # Testando a criação de um FruityPebble inválido sem o campo 'name'
  it 'is invalid without a name' do
    cocoa_puff = CocoaPuff.create!(name: 'Cocoa Puff', archived: false)
    fruity_pebble = FruityPebble.new(pebble_count: 5, cocoa_puff: cocoa_puff)
    expect(fruity_pebble).not_to be_valid
  end

  # Testando a criação de um FruityPebble inválido com o 'pebble_count' maior ou igual a 10
  it 'is invalid with a pebble_count greater than or equal to 10' do
    cocoa_puff = CocoaPuff.create!(name: 'Cocoa Puff', archived: false)
    fruity_pebble = FruityPebble.new(name: 'Fruity Pebble', pebble_count: 10, cocoa_puff: cocoa_puff)
    expect(fruity_pebble).not_to be_valid
  end
end
