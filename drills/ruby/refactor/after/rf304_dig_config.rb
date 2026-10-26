def db_host(config)
  config.dig(:database, :primary, :host)
end
