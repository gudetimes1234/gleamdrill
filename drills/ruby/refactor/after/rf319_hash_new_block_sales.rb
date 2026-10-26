def sales_table(sales)
  table = Hash.new { |hash, region| hash[region] = Hash.new(0) }
  sales.each do |region, product, qty|
    table[region][product] += qty
  end
  table
end
