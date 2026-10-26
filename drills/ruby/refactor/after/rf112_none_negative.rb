def valid_readings?(readings)
  readings.none? { |reading| reading.negative? }
end
