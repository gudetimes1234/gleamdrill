def by_age(people):
    return [name for name, age in sorted(people, key=lambda person: person[1])]
