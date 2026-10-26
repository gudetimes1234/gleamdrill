NumberRange = Data.define(:min, :max) do
  def include?(value)
    value.between?(min, max)
  end
end

def readings_outside(readings, range)
  readings.reject { |r| range.include?(r) }
end

def readings_inside(readings, range)
  readings.select { |r| range.include?(r) }
end
