App::Application.routes.draw do

  devise_for :users,
    controllers: {sessions:'sessions'}


  get '/' => 'pages#index'

  # angular: template controller for directives (see directives)
  get "/angular/:template_class/:template_name" => "angular_templates#show"

end
