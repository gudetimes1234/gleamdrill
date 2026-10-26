def in_stock(products)
  found = []
  i = 0
  while i < products.length
    found.push(products[i]) if products[i].stock > 0
    i += 1
  end
  found
end
