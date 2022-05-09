class BotSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :price, :image

  belongs_to :category
end
