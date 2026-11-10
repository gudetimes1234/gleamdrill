def delivery_days(order, rush):
    if rush:
        if order["region"] == "local":
            return 1
        return 2
    if order["region"] == "local":
        return 3
    return 5
