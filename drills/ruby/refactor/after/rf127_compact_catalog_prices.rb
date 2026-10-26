def prices_for(skus, catalog)
  skus.map { |sku| catalog[sku] }.compact
end
