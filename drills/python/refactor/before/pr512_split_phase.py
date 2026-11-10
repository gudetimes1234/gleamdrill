PRICES = {"widget": 4, "gadget": 10}


def order_total(order_text):
    total = 0
    for line in order_text.splitlines():
        name, qty = line.split(":")
        total += PRICES[name.strip()] * int(qty)
    return total
