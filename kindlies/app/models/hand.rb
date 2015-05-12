class Hand < ActiveRecord::Base

  #WE COULD PUT VALIDATIONS HERE.....

    belongs_to :user
    def to_s
      self.title
    end
end
