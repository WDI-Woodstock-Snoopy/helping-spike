class SessionsController < ApplicationController

  # log-in behavior
  def log_in_behavior
    user = User.find_by(username: params[:username])
    if user && user.authenticate( params[:password] )
      session[:user_id] = user.id
      redirect_to "/hands"
    else
      redirect_to "/sign_in"
    end
  end

  #logout behavior
  def log_out_behavior
    session[:user_id] = nil
    redirect_to "/sign_in"
  end

end
