class Api::CocoaPuffsController < ApplicationController
    before_action :set_cocoa_puff, only: [:show, :update, :destroy]
  
    # GET /api/cocoa_puffs
    def index
      @cocoa_puffs = CocoaPuff.all
      render json: @cocoa_puffs
    end
  
    # POST /api/cocoa_puffs
    def create
      @cocoa_puff = CocoaPuff.new(cocoa_puff_params)
  
      if @cocoa_puff.save
        render json: @cocoa_puff, status: :created
      else
        render json: @cocoa_puff.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /api/cocoa_puffs/:id
    def update
      if @cocoa_puff.update(cocoa_puff_params)
        render json: @cocoa_puff
      else
        render json: @cocoa_puff.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /api/cocoa_puffs/:id
    def destroy
      @cocoa_puff.destroy
      head :no_content
    end
  
    private
  
    def set_cocoa_puff
      @cocoa_puff = CocoaPuff.find(params[:id])
    end
  
    def cocoa_puff_params
      params.require(:cocoa_puff).permit(:name, :archived)
    end
  end
  
