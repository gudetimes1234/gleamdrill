def price_list(products)
  products.to_h { |product| [product.name, product.cents / 100.0] }
end
