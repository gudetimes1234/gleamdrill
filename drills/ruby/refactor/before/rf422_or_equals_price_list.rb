class PriceList
  def initialize(loader)
    @loader = loader
  end

  def prices
    if @prices.nil?
      @prices = @loader.call
    end
    @prices
  end
end
