class TimeMap:
    def __init__(self):
        self.store = {}  # @1

    def set(self, key, value, timestamp):
        # Timestamps only ever increase, so appending keeps each key's history
        # sorted for free.
        self.store.setdefault(key, []).append((timestamp, value))  # @2

    def get(self, key, timestamp):
        # The history is sorted, so the newest entry at or before a timestamp is
        # a halving question, not a walk.
        history = self.store.get(key, [])  # @3
        low, high = 0, len(history) - 1  # @4
        best = ""  # @5
        while low <= high:  # @6
            mid = (low + high) // 2  # @7
            if history[mid][0] <= timestamp:  # @8
                best = history[mid][1]  # @9
                low = mid + 1  # @10
            else:  # @11
                high = mid - 1  # @11
        return best  # @12
