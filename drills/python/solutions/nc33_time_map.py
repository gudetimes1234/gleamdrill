class TimeMap:
    def __init__(self):
        self.store = {}

    def set(self, key, value, timestamp):
        # Timestamps only ever increase, so appending keeps each key's history
        # sorted for free.
        self.store.setdefault(key, []).append((timestamp, value))

    def get(self, key, timestamp):
        # The history is sorted, so the newest entry at or before a timestamp is
        # a halving question, not a walk.
        history = self.store.get(key, [])
        low, high = 0, len(history) - 1
        best = ""
        while low <= high:
            mid = (low + high) // 2
            if history[mid][0] <= timestamp:
                best = history[mid][1]
                low = mid + 1
            else:
                high = mid - 1
        return best
