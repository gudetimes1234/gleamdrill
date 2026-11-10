def by_age(people):
    pairs = []
    for name, age in people:
        pairs.append((age, name))
    pairs.sort()
    return [name for age, name in pairs]
