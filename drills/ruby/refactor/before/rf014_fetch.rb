def timeout(config)
  config.has_key?(:timeout) ? config[:timeout] : 30
end
