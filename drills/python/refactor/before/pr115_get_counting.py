def totals(expenses):
    by_category = {}
    for category, amount in expenses:
        if category in by_category:
            by_category[category] = by_category[category] + amount
        else:
            by_category[category] = amount
    return by_category
