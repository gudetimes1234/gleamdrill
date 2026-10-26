def orders_by_status(orders)
  buckets = Hash.new { |hash, key| hash[key] = [] }
  orders.each do |order|
    buckets[order.status] << order
  end
  buckets
end
