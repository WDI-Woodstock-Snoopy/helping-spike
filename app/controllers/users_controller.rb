class UsersController < ApplicationController

  def index
    authenticate!
    @users = User.all
  end

  def new
    @user = User.new
  end
  def create
    user = User.create( user_params )
    if(user.save)
    session[:user_id] = user.id
      redirect_to '/hands'
    else
      redirect_to '/sign_in'
    end
  end

  def edit
    authenticate!
    @user = User.find(params[:id])
  end
  def update
    authenticate!
    user = User.find(params[:id])
    user.update! (user_params )
    redirect_to "/users/#{ user.id }"
  end

  def updatescore
    @user = User.find(params[:id])
    @userscore
    render json: @userscore.to_json(methods: :score)
  end

  def show
    authenticate!
    @user = User.find(params[:id])
  end

  def destroy
    authenticate!
    User.destroy( params[:id] )
    redirect_to "/users"
  end

  def profile
    authenticate!
    @user = current_user
    @hand = Hand.new
  end

  def map_page
    authenticate!
    @user = current_user
  end

  def sign_in
    @user = User.new
  end


  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
