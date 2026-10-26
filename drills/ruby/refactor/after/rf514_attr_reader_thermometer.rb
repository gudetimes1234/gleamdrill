class Thermometer
  attr_reader :celsius, :location

  def initialize(celsius, location)
    @celsius = celsius
    @location = location
  end

  def fahrenheit
    celsius * 9 / 5.0 + 32
  end
end
