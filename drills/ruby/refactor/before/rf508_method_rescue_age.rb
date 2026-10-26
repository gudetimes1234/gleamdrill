def parse_age(text)
  begin
    Integer(text)
  rescue ArgumentError, TypeError
    nil
  end
end
