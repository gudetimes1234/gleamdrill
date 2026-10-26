def refund_count(amounts)
  amounts.count(&:negative?)
end
