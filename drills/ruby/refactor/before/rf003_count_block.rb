def count_adults(ages)
  count = 0
  ages.each do |age|
    count += 1 if age >= 18
  end
  count
end
