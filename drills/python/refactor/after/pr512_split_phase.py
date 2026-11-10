PRICES = {"widget": 4, "gadget": 10}


def parse_order(order_text):
    pairs = [line.split(":") for line in order_text.splitlines()]
    return [(name.strip(), int(qty)) for name, qty in pairs]


def order_total(order_text):
    return sum(PRICES[name] * qty for name, qty in parse_order(order_text))
