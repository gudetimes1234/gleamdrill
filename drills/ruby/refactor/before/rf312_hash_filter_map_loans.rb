def late_notices(loans, today)
  notices = []
  loans.each do |name, due|
    if due < today
      notices.push("#{name} owes #{(today - due) * 2}")
    end
  end
  notices
end
