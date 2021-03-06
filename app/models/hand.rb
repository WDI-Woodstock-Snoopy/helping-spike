class Hand < ActiveRecord::Base

    belongs_to :user
    acts_as_votable
  
    def to_s
      self.title
    end

    def score
      self.get_upvotes.length
    end

end
