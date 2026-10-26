def to_fahrenheit(celsius)
  celsius.map { |degrees| (degrees * 9.0 / 5 + 32).round(1) }
end
