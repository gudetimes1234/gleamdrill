import functools


def roster(people):
    def compare(a, b):
        if a["team"] != b["team"]:
            return -1 if a["team"] < b["team"] else 1
        if a["name"] != b["name"]:
            return -1 if a["name"] < b["name"] else 1
        return 0

    return sorted(people, key=functools.cmp_to_key(compare))
