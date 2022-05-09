class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :rating, :created_at, :bot_id, :user_id
  belongs_to :user
end
