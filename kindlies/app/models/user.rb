class User < ActiveRecord::Base

  #WE COULD PUT VALIDATIONS HERE.....
  
  has_many :hands
  def to_s
    self.username
  end
end
