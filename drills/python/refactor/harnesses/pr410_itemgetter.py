need("roster")


def names(people):
    return [person["team"] + ":" + person["name"] for person in roster(people)]


staff = [
    {"team": "ops", "name": "Zoe"},
    {"team": "dev", "name": "Mia"},
    {"team": "ops", "name": "Ann"},
    {"team": "dev", "name": "Bo"},
]
tc("roster(staff)", ["dev:Bo", "dev:Mia", "ops:Ann", "ops:Zoe"], names(staff))
tc("roster([one])", ["qa:Lu"], names([{"team": "qa", "name": "Lu"}]))
tc("roster([]) -- empty", [], names([]))
uses(r"itemgetter\(", "operator.itemgetter")
avoids(r"cmp_to_key", "cmp_to_key")
