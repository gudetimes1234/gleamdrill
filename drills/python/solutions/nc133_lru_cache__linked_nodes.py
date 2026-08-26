class LRUCache:
    def __init__(self, capacity):
        # A doubly linked list of keys, newest at the head, plus a map from key
        # to its node. The map makes finding a node O(1) and the back-pointers
        # make unlinking it O(1) -- neither alone is enough, which is why this
        # is the structure the problem is really about.
        self.capacity = capacity
        self.nodes = {}
        self.head = {"key": None, "value": None}
        self.tail = {"key": None, "value": None}
        self.head["next"], self.head["prev"] = self.tail, None
        self.tail["prev"], self.tail["next"] = self.head, None

    def get(self, key):
        if key not in self.nodes:
            return -1
        node = self.nodes[key]
        self.unlink(node)
        self.push(node)
        return node["value"]

    def put(self, key, value):
        if key in self.nodes:
            self.unlink(self.nodes.pop(key))
        node = {"key": key, "value": value, "prev": None, "next": None}
        self.nodes[key] = node
        self.push(node)
        if len(self.nodes) > self.capacity:
            oldest = self.tail["prev"]
            self.unlink(oldest)
            del self.nodes[oldest["key"]]

    def push(self, node):
        node["prev"], node["next"] = self.head, self.head["next"]
        self.head["next"]["prev"] = node
        self.head["next"] = node

    def unlink(self, node):
        node["prev"]["next"] = node["next"]
        node["next"]["prev"] = node["prev"]
