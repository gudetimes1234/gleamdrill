def menu_lines(dishes)
  dishes.map.with_index(1) { |dish, number| "#{number}) #{dish.name} $#{dish.price}" }
end
