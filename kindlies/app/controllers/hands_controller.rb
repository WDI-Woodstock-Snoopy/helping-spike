class HandsController < ApplicationController

  def index
    authenticate!
    @hands = Hand.all
    @new = @hands.order(:updated_at).reverse
    @hot = @hands.sort_by {|hand| hand.get_likes.size}.reverse
    @user = current_user
  end

  def handsapi
    #add sort order
    hands = Hand.all
    @hands = hands
    render json: hands
  end

  def handsapinew
    @hands = Hand.all
    @new = @hands.order(:updated_at).reverse
    render json: @new.to_json(methods: :score)
  end

  def handsapihot
    @hands = Hand.all
    @hot = @hands.sort_by {|hand| hand.get_likes.size}.reverse
    render json: @hot.to_json(methods: :score)
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

  def edit
    @hand = Hand.find(params[:id])
  end
  def update
    hand = Hand.find(params[:id])
    hand.update! (hand_params)
    redirect_to "/hands"
  end

  def destroy
    Hand.destroy(params[:id])
    redirect_to "/hands"
  end

  def upvote
    @hand = Hand.find(params[:id])
    @hand.upvote_by current_user
    @hand.save!
    render json: @hand.to_json(methods: :score)
  end

  private

  def hand_params
    params.require(:hand).permit(:message, :lat, :long, :title, :user_id, :score, :get_likes, :image)
  end

end
