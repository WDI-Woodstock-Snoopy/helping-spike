class HandsController < ApplicationController

  def index
    @hands = Hand.all
    @new = @hands.order(:updated_at).reverse

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

  def upvote
    @hand = Hand.find(params[:id])
    @hand.upvote_by current_user
    redirect_to '/hands'
  end

  private

  def hand_params
    params.require(:hand).permit(:message, :lat, :long, :title, :user_id, :score)
  end

end
