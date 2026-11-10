def totals(expenses):
    by_category = {}
    for category, amount in expenses:
        by_category[category] = by_category.get(category, 0) + amount
    return by_category
