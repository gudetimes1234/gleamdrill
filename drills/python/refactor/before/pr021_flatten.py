def all_items(orders):
    items = []
    for order in orders:
        for item in order:
            items.append(item)
    return items
