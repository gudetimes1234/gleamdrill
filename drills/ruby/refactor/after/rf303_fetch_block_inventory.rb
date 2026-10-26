def stock_of(inventory, item)
  inventory.fetch(item) { raise ArgumentError, "unknown item: #{item}" }
end
