def first_overdue(invoices):
    for invoice in invoices:
        if invoice["days"] > 30:
            return invoice["id"]
    return None
