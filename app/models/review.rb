class Review < ApplicationRecord
  belongs_to :bot
  belongs_to :user

  validates_presence_of :bot_id, :user_id, :description, :rating
  validates :bot_id,
            uniqueness: {
              scope: :user_id,
              message: "You've reviewed this bot!",
            }
end
