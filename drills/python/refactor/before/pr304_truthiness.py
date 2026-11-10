def first_or_default(items, default):
    if len(items) > 0:
        return items[0]
    return default
