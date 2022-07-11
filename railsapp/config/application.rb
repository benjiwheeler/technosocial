require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Technosocial
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de



    # load custom modules
    config.autoload_paths += Dir["#{config.root}/lib/modules/"]

    # add vendor fonts
#    config.assets.paths << "#{Rails.root}/vendor/assets/fonts/"
#    config.assets.paths << "#{Rails.root}/vendor/assets/fonts/fontawesome-mfizz/"
#    config.assets.precompile << "#{Rails.root}/vendor/assets/stylesheets/fontawesome-mfizz/*.css"
#    config.assets.precompile += %w(*mfizz.css *.png *.jpg *.jpeg *.gif, *.ttf, *.eot, *.svg, *.woff)


  end
end
