class Hand < ActiveRecord::Base
    belongs_to :user
    def to_s
      self.title
    end
end
