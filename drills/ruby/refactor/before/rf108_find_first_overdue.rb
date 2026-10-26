def first_overdue(invoices)
  found = nil
  invoices.each do |invoice|
    if found.nil? && invoice[:days_late] > 0
      found = invoice
    end
  end
  found
end
