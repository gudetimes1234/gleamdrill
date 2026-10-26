def combine_stock(warehouse, store)
  warehouse.merge(store) { |_item, ours, theirs| ours + theirs }
end
