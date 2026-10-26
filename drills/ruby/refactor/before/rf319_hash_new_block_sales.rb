def sales_table(sales)
  table = {}
  sales.each do |region, product, qty|
    table[region] = {} unless table.key?(region)
    table[region][product] = 0 unless table[region].key?(product)
    table[region][product] += qty
  end
  table
end
