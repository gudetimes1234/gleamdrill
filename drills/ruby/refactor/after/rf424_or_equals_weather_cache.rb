class WeatherCache
  def initialize(api)
    @api = api
    @cache = {}
  end

  def temperature(city)
    @cache[city] ||= @api.call(city)
  end
end
