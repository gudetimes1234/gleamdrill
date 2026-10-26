def db_host(config)
  if config[:database] && config[:database][:primary]
    config[:database][:primary][:host]
  end
end
