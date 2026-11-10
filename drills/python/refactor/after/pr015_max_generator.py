def biggest_order(orders):
    return max((order["price"] * order["qty"] for order in orders), default=0)
