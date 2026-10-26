need :open_tickets

t1 = { id: 1, status: :open }
t2 = { id: 2, status: :closed }
t3 = { id: 3, status: :reopened }
t4 = { id: 4, status: :new }
tc "open_tickets([open, closed, reopened, new])", [t1, t3, t4], open_tickets([t1, t2, t3, t4])
tc "open_tickets([closed])", [], open_tickets([t2])
tc "open_tickets([])", [], open_tickets([])
uses(/\.include\?/, "include?")
avoids(/==/, "chained ==")
avoids(/\|\|/, "||")
