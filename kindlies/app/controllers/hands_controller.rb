class HandsController < ApplicationController

  def new
    @hand = Hand.new
  end

  def create
    @hand = Hand.create( hand_params )
    # hand.user = current_user
    # hand.save
    redirect_to "/users"
  end

  def destroy
    Hand.destroy(params[:id])
    redirect_to "/"
  end

  private

  def hand_params
    params.require(:hand).permit(:message)
  end

end
