def refund_count(amounts)
  count = 0
  amounts.each do |amount|
    count += 1 if amount < 0
  end
  count
end
