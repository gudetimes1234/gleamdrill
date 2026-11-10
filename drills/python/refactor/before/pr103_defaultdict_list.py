def orders_by_customer(orders):
    grouped = {}
    for customer, amount in orders:
        if customer not in grouped:
            grouped[customer] = []
        grouped[customer].append(amount)
    return grouped
