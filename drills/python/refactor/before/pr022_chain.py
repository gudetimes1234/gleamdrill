def open_tickets(today, backlog):
    found = []
    for ticket in today:
        if ticket["open"]:
            found.append(ticket["id"])
    for ticket in backlog:
        if ticket["open"]:
            found.append(ticket["id"])
    return found
