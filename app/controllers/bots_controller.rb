class BotsController < ApplicationController
  def index
    bots = Bot.all.order(price: :asc)
    render json: bots, include: ['category']
  end
  def show
    selected_bots = Bot.find(params[:id])
    render json: selected_bots,
           include: %w[category.name reviews reviews.user reviews.bot],
           serializer: BotWithCategoryReviewSerializer
  end
end
