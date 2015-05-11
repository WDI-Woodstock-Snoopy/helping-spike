class User < ActiveRecord::Base
  has_many :hands
  def to_s
    self.username
  end
end
