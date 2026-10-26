def stock_of(inventory, item)
  unless inventory.include?(item)
    raise ArgumentError, "unknown item: #{item}"
  end
  inventory[item]
end
