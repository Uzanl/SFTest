Rails.application.routes.draw do
  # Existing routes
  get "first/welcome"
  
  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # Uncomment for PWA support
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # API namespace with nested resources
  namespace :api do
    resources :cocoa_puffs do
      resources :fruity_pebbles, only: [:create, :index]
    end
  end

  # Defines the root path route ("/")
  # root "posts#index"
end
