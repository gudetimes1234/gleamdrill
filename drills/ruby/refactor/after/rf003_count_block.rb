def count_adults(ages)
  ages.count { |age| age >= 18 }
end
