class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        self.store.setdefault(key, []).insert(0, (timestamp, value))

    def get(self, key, timestamp):
        # Newest first, so the first entry old enough is the answer. O(n) per
        # lookup against the halving version's O(log n), but there is no split
        # arithmetic to get wrong.
        for stamp, value in self.store.get(key, []):
            if stamp <= timestamp:
                return value
        return ""
