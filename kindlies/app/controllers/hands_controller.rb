class HandsController < ApplicationController

  def index
    @hands = Hand.all
  end

  def handsapi
    hands = Hand.all
    @hands = hands
    render json: hands
  end

  def new
    @hands = Hand.new
  end
  def create
    hand = Hand.create( hand_params )
    hand.user = current_user
    hand.save!
    redirect_to "/hands"
  end

  def destroy
    Hand.destroy(params[:id])
    redirect_to "/hands"
  end

  private

  def hand_params
    params.require(:hand).permit(:message, :lat, :long, :title)
  end

end
