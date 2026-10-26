def reserve(stock, item)
  raise "out of stock: #{item}" if stock.fetch(item, 0) == 0
  stock.merge(item => stock[item] - 1)
end

def reserve_or_keep(stock, item)
  begin
    reserve(stock, item)
  rescue RuntimeError => e
    raise unless e.message.start_with?("out of stock")
    stock
  end
end
