class Basket
  def initialize(prices)
    @prices = prices
  end

  def total
    @prices.sum
  end

  def empty?
    @prices.empty?
  end
end

def checkout_message(basket)
  basket.empty? ? "Your basket is empty" : "Total: #{basket.total}"
end
