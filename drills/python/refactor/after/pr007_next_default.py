def first_overdue(invoices):
    return next((invoice["id"] for invoice in invoices if invoice["days"] > 30), None)
