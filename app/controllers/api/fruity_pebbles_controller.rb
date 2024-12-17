class Api::FruityPebblesController < ApplicationController
  before_action :set_cocoa_puff, only: [:create, :index]

  # GET /api/cocoa_puffs/:cocoa_puff_id/fruity_pebbles
  def index
    @fruity_pebbles = @cocoa_puff.fruity_pebbles
    render json: @fruity_pebbles, status: :ok
  end

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
    @cocoa_puff = CocoaPuff.find_by(id: params[:cocoa_puff_id])

    unless @cocoa_puff
      render json: { error: "Cocoa Puff not found" }, status: :not_found
    end
  end

  def fruity_pebble_params
    params.require(:fruity_pebble).permit(:name, :pebble_count)
  end
end
