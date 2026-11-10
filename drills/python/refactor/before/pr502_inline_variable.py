def free_shipping(order):
    total = order["price"] * order["quantity"]
    qualifies = total >= 100
    return qualifies
