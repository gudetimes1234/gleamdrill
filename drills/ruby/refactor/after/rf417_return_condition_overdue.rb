def overdue?(invoice, today)
  !invoice[:paid] && today > invoice[:due]
end
