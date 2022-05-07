class BotSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :image

  has_one :category
end
