class OutOfStock < StandardError; end

def reserve(stock, item)
  raise OutOfStock, "out of stock: #{item}" if stock.fetch(item, 0).zero?

  stock.merge(item => stock[item] - 1)
end

def reserve_or_keep(stock, item)
  reserve(stock, item)
rescue OutOfStock
  stock
end
