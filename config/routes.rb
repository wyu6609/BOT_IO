Rails.application.routes.draw do
  resources :user_items
  resources :categories, only: %i[index show]
  resources :reviews
  resources :bots, only: %i[index show]

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/cart/:id', to: 'user_items#cart'
  get 'clear_cart/:id', to: 'user_items#clear_cart'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
