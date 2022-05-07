class ReviewUserSerializer < ActiveModel::Serializer
  attributes :id,
             :description,
             :rating,
             :user_id,
             :bot_id,
             :created_at,
             :updated_at
  belongs_to :bot
  belongs_to :user
end
