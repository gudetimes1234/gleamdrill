from collections import defaultdict


def orders_by_customer(orders):
    grouped = defaultdict(list)
    for customer, amount in orders:
        grouped[customer].append(amount)
    return dict(grouped)
