def read_setting(settings, key, log)
  begin
    settings.fetch(key)
  rescue KeyError
    "default"
  ensure
    log << key
  end
end
