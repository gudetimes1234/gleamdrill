def invoice_lines(invoice):
    lines = []
    lines.append("*" * 21)
    lines.append("Customer Owes".center(21))
    lines.append("*" * 21)
    outstanding = 0
    for amount in invoice["orders"]:
        outstanding += amount
    lines.append(f"name: {invoice['customer']}")
    lines.append(f"amount: {outstanding}")
    return lines
