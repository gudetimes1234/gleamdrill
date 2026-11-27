class LRUCache:
    def __init__(self, capacity):
        # A plain dict, leaning on the fact that Python dicts remember insertion
        # order: deleting a key and putting it back makes it the newest, so the
        # oldest is simply the first key. That is the recency list, free.
        self.capacity = capacity  # @1
        self.entries = {}  # @2

    def get(self, key):
        if key not in self.entries:  # @3
            return -1  # @3
        # Reading counts as use, so the key moves to the newest position.
        value = self.entries.pop(key)  # @4
        self.entries[key] = value  # @5
        return value  # @6

    def put(self, key, value):
        if key in self.entries:  # @7
            del self.entries[key]  # @7
        self.entries[key] = value  # @8
        if len(self.entries) > self.capacity:  # @9
            oldest = next(iter(self.entries))  # @10
            del self.entries[oldest]  # @11
