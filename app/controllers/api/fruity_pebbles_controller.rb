class Api::FruityPebblesController < ApplicationController
    before_action :set_cocoa_puff, only: [:create]
  
    # POST /api/cocoa_puffs/:cocoa_puff_id/fruity_pebbles
    def create
      @fruity_pebble = @cocoa_puff.fruity_pebbles.build(fruity_pebble_params)
  
      if @fruity_pebble.save
        render json: @fruity_pebble, status: :created
      else
        render json: @fruity_pebble.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_cocoa_puff
      @cocoa_puff = CocoaPuff.find(params[:cocoa_puff_id])
    end
  
    def fruity_pebble_params
      params.require(:fruity_pebble).permit(:name, :pebble_count)
    end
  end
  
