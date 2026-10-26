def in_stock(products)
  products.select { |product| product.stock > 0 }
end
