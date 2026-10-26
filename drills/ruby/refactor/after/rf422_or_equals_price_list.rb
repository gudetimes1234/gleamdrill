class PriceList
  def initialize(loader)
    @loader = loader
  end

  def prices
    @prices ||= @loader.call
  end
end
