class Thermometer
  def initialize(celsius, location)
    @celsius = celsius
    @location = location
  end

  def celsius
    @celsius
  end

  def location
    @location
  end

  def fahrenheit
    @celsius * 9 / 5.0 + 32
  end
end
