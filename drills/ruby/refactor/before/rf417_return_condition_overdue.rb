def overdue?(invoice, today)
  invoice[:paid] == false && today > invoice[:due] ? true : false
end
