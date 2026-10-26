def low_stock(inventory, threshold)
  inventory.select { |_item, count| count < threshold }
end
