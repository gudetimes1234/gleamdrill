class WeatherCache
  def initialize(api)
    @api = api
    @cache = {}
  end

  def temperature(city)
    if @cache.key?(city)
      return @cache[city]
    end
    @cache[city] = @api.call(city)
  end
end
