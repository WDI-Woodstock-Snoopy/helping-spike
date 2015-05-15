class Hand < ActiveRecord::Base

  #WE COULD PUT VALIDATIONS HERE.....

    belongs_to :user
    acts_as_votable
    # mount_uploader :image, ImageUploader

    def to_s
      self.title
    end

    def score
      self.get_upvotes.length
    end

end
