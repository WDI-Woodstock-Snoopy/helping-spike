class User < ActiveRecord::Base
  has_secure_password
  validates_presence_of :password, on: :create
  validates :password, length: {in: 7..20}


  has_many :hands
  def to_s
    self.username
  end
end
