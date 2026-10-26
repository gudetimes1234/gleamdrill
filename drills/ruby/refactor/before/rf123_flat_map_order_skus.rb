def skus(orders)
  result = []
  orders.each do |order|
    order.lines.each do |line|
      result << line
    end
  end
  result
end
