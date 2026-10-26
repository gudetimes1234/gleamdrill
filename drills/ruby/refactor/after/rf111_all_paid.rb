def all_paid?(invoices)
  invoices.all? { |invoice| invoice[:paid] }
end
