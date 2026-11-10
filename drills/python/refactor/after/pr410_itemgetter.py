from operator import itemgetter


def roster(people):
    return sorted(people, key=itemgetter("team", "name"))
