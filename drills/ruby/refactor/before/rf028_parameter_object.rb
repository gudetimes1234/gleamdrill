def readings_outside(readings, min, max)
  readings.reject { |r| r >= min && r <= max }
end

def readings_inside(readings, min, max)
  readings.select { |r| r >= min && r <= max }
end
