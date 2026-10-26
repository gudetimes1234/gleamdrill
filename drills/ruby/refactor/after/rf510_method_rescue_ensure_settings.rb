def read_setting(settings, key, log)
  settings.fetch(key)
rescue KeyError
  "default"
ensure
  log << key
end
