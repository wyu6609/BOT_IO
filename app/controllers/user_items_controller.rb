class UserItemsController < ApplicationController
  def cart
    # @user_item = UserItem.find(params[:id])
    # render json: @user_item
    user_items = UserItem.where(user_id: params[:id])
    render json: user_items
  end

  def create
    new_user_item = UserItem.create!(user_item_params)
    render json: new_user_item, status: :created
  end

  def destroy
    selected_item = UserItem.find(params[:id])
    selected_item.destroy
    render json: selected_item
  end

  def clearcart
    user_items = UserItem.where(user_id: params[:id])
    user_items.destroy_all
    render json: user_items
  end

  private

  def user_item_params
    params.permit(:user_id, :bot_id)
  end
end
