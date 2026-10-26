def valid_readings?(readings)
  readings.select { |reading| reading < 0 }.length == 0
end
