def combine_stock(warehouse, store)
  total = warehouse.dup
  store.each do |item, count|
    if total.key?(item)
      total[item] += count
    else
      total[item] = count
    end
  end
  total
end
