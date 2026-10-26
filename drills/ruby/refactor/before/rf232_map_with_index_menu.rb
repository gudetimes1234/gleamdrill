def menu_lines(dishes)
  (0...dishes.size).map do |i|
    "#{i + 1}) #{dishes[i].name} $#{dishes[i].price}"
  end
end
