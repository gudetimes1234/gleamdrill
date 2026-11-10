from itertools import chain


def open_tickets(today, backlog):
    return [ticket["id"] for ticket in chain(today, backlog) if ticket["open"]]
