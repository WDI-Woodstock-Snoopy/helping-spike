class HandsController < ApplicationController
  def create
    hand = Hand.create( hand_params )
    # hand.user = current_user
    # hand.save
    redirect_to "/index"
  end

  def destroy
    Hand.destroy(params[:id])
    redirect_to "/index"
  end

  private

  def hand_params
    params.require(:hand).permit(:message)
  end

end
