def make_tickets(count)
  tickets = []
  i = 0
  while i < count
    tickets << "T-#{i + 1}"
    i += 1
  end
  tickets
end
