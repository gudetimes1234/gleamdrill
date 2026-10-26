def first_per_day(readings)
  readings.uniq { |reading| reading[:day] }
end
