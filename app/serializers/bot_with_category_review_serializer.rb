class BotWithCategoryReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :image

  belongs_to :category
  has_many :reviews, serializer: ReviewUserSerializer
end
