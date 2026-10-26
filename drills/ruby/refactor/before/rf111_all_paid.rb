def all_paid?(invoices)
  ok = true
  invoices.each do |invoice|
    ok = false unless invoice[:paid]
  end
  ok
end
