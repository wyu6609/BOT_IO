class BotWithCategoryReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :image

  has_many :reviews, serializer: ReviewUserSerializer
  has_one :category
end
