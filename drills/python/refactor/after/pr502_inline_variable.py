def free_shipping(order):
    total = order["price"] * order["quantity"]
    return total >= 100
