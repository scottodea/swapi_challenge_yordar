Rails.application.routes.draw do
  root 'films#index'
  get 'films', to: 'films#index'
  get 'films/:id', to: "films#show"
end
