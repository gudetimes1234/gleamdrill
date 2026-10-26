def late_notices(loans, today)
  loans.filter_map { |name, due| "#{name} owes #{(today - due) * 2}" if due < today }
end
