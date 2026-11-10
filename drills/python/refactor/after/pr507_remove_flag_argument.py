def rush_delivery_days(order):
    return 1 if order["region"] == "local" else 2


def regular_delivery_days(order):
    return 3 if order["region"] == "local" else 5


def delivery_days(order, rush):
    if rush:
        return rush_delivery_days(order)
    return regular_delivery_days(order)
