def banner():
    return ["*" * 21, "Customer Owes".center(21), "*" * 21]


def outstanding(invoice):
    return sum(invoice["orders"])


def invoice_lines(invoice):
    return banner() + [
        f"name: {invoice['customer']}",
        f"amount: {outstanding(invoice)}",
    ]
