# spec/models/cocoa_puff_spec.rb
require 'rails_helper'

RSpec.describe CocoaPuff, type: :model do
  # Teste de validações

  context 'validations' do
    it 'is valid with valid attributes' do
      cocoa_puff = CocoaPuff.new(name: 'Test Cocoa Puff', archived: false)
      expect(cocoa_puff).to be_valid
    end

    it 'is not valid without a name' do
      cocoa_puff = CocoaPuff.new(name: nil, archived: false)
      expect(cocoa_puff).not_to be_valid
    end

    it 'is not valid with a duplicate name' do
      CocoaPuff.create!(name: 'Test Cocoa Puff', archived: false)
      cocoa_puff = CocoaPuff.new(name: 'Test Cocoa Puff', archived: false)
      expect(cocoa_puff).not_to be_valid
    end

    it 'is not valid if archived is not a boolean' do
      cocoa_puff = CocoaPuff.new(name: 'Test Cocoa Puff', archived: nil)
      expect(cocoa_puff).not_to be_valid
    end
  end

  # Teste de criação de Cocoa Puff
  context 'create' do
    it 'creates a valid Cocoa Puff' do
      cocoa_puff = CocoaPuff.create(name: 'New Cocoa Puff', archived: false)
      expect(cocoa_puff).to be_persisted
    end

    it 'does not create a Cocoa Puff without a name' do
      cocoa_puff = CocoaPuff.create(name: nil, archived: false)
      expect(cocoa_puff).not_to be_persisted
      expect(cocoa_puff.errors[:name]).to include("can't be blank")
    end
  end

  # Teste de arquivamento
  context 'archiving' do
    it 'is not archived by default' do
      cocoa_puff = CocoaPuff.create!(name: 'Archived Cocoa Puff')
      expect(cocoa_puff.archived).to be_falsey
    end

    it 'can be archived' do
      cocoa_puff = CocoaPuff.create!(name: 'Archived Cocoa Puff', archived: true)
      expect(cocoa_puff.archived).to be_truthy
    end
  end

  # Teste de escopo (caso haja um escopo para `archived: false`)
  context 'scopes' do
    it 'returns only unarchived Cocoa Puffs' do
      CocoaPuff.create!(name: 'Archived Cocoa Puff', archived: true)
      unarchived_cocoa_puff = CocoaPuff.create!(name: 'Unarchived Cocoa Puff', archived: false)

      expect(CocoaPuff.where(archived: false)).to include(unarchived_cocoa_puff)
      expect(CocoaPuff.where(archived: false)).not_to include(CocoaPuff.find_by(name: 'Archived Cocoa Puff'))
    end
  end
end
