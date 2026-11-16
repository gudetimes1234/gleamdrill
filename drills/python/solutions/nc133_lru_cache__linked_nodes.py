class LRUCache:
    def __init__(self, capacity):
        # A doubly linked list of keys, newest at the head, plus a map from key
        # to its node. The map makes finding a node O(1) and the back-pointers
        # make unlinking it O(1) -- neither alone is enough, which is why this
        # is the structure the problem is really about.
        self.capacity = capacity  # @1
        self.nodes = {}  # @2
        self.head = {"key": None, "value": None}  # @3
        self.tail = {"key": None, "value": None}  # @3
        self.head["next"], self.head["prev"] = self.tail, None  # @4
        self.tail["prev"], self.tail["next"] = self.head, None  # @4

    def get(self, key):
        if key not in self.nodes:  # @5
            return -1  # @5
        node = self.nodes[key]  # @6
        self.unlink(node)  # @7
        self.push(node)  # @7
        return node["value"]  # @8

    def put(self, key, value):
        if key in self.nodes:  # @9
            self.unlink(self.nodes.pop(key))  # @9
        node = {"key": key, "value": value, "prev": None, "next": None}  # @10
        self.nodes[key] = node  # @11
        self.push(node)  # @11
        if len(self.nodes) > self.capacity:  # @12
            oldest = self.tail["prev"]  # @13
            self.unlink(oldest)  # @14
            del self.nodes[oldest["key"]]  # @14

    def push(self, node):
        node["prev"], node["next"] = self.head, self.head["next"]  # @15
        self.head["next"]["prev"] = node  # @16
        self.head["next"] = node  # @17

    def unlink(self, node):
        node["prev"]["next"] = node["next"]  # @18
        node["next"]["prev"] = node["prev"]  # @19
