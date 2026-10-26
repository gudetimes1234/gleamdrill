def first_overdue(invoices)
  invoices.find { |invoice| invoice[:days_late] > 0 }
end
