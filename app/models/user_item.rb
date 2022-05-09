class UserItem < ApplicationRecord
  belongs_to :user
  belongs_to :bot

  validates :bot,
            uniqueness: {
              scope: :user_id,
              message: 'Only one bot per customer!',
            }
end
