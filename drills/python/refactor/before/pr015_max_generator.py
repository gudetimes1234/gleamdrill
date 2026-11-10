def biggest_order(orders):
    biggest = 0
    for order in orders:
        total = order["price"] * order["qty"]
        if total > biggest:
            biggest = total
    return biggest
