class Basket
  def initialize(prices)
    @prices = prices
  end

  def get_total
    @prices.sum
  end

  def is_empty
    @prices.empty?
  end
end

def checkout_message(basket)
  basket.is_empty ? "Your basket is empty" : "Total: #{basket.get_total}"
end
