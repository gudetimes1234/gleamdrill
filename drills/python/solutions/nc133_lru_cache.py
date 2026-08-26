class LRUCache:
    def __init__(self, capacity):
        # A plain dict, leaning on the fact that Python dicts remember insertion
        # order: deleting a key and putting it back makes it the newest, so the
        # oldest is simply the first key. That is the recency list, free.
        self.capacity = capacity
        self.entries = {}

    def get(self, key):
        if key not in self.entries:
            return -1
        # Reading counts as use, so the key moves to the newest position.
        value = self.entries.pop(key)
        self.entries[key] = value
        return value

    def put(self, key, value):
        if key in self.entries:
            del self.entries[key]
        self.entries[key] = value
        if len(self.entries) > self.capacity:
            oldest = next(iter(self.entries))
            del self.entries[oldest]
