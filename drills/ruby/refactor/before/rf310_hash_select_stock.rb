def low_stock(inventory, threshold)
  low = {}
  inventory.each do |item, count|
    if count < threshold
      low[item] = count
    end
  end
  low
end
