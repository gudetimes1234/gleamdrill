def parse_age(text)
  Integer(text)
rescue ArgumentError, TypeError
  nil
end
