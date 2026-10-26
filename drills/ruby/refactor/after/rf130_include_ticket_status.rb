def open_tickets(tickets)
  tickets.select { |ticket| %i[new open reopened].include?(ticket[:status]) }
end
