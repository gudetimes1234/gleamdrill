def open_tickets(tickets)
  tickets.select do |ticket|
    ticket[:status] == :new || ticket[:status] == :open || ticket[:status] == :reopened
  end
end
