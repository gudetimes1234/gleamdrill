try:
    (copyRandomList, Node)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# Builds a list from [value, randomIndex] pairs, where randomIndex is None for
# no link.
def __build__(pairs):
    nodes = [Node(value) for value, _random in pairs]
    for i, node in enumerate(nodes):
        node.next = nodes[i + 1] if i + 1 < len(nodes) else None
        node.random = nodes[pairs[i][1]] if pairs[i][1] is not None else None
    return nodes[0] if nodes else None

# Serialises back to [value, randomIndex] pairs, and asserts along the way that
# every node is a *new* one -- a copy that reuses the originals would otherwise
# pass every value comparison.
def __serialise__(head, originals):
    nodes, node = [], head
    while node is not None and len(nodes) < 1000:
        nodes.append(node)
        node = node.next
    places = {id(node): i for i, node in enumerate(nodes)}
    if any(id(node) in originals for node in nodes):
        return "reused an original node"
    return [[node.val, places.get(id(node.random))] for node in nodes]

def __copied__(pairs):
    head = __build__(pairs)
    originals, node = set(), head
    while node is not None:
        originals.add(id(node))
        node = node.next
    return __serialise__(copyRandomList(head), originals)

__case__("copyRandomList([[7,None],[13,0]])", [[7, None], [13, 0]], __copied__([[7, None], [13, 0]]))
__case__("copyRandomList([[1,0]]) -- a node pointing at itself", [[1, 0]], __copied__([[1, 0]]))
__case__("copyRandomList(a forward link to a node not yet copied)", [[1, 2], [2, None], [3, 0]], __copied__([[1, 2], [2, None], [3, 0]]))
__case__("copyRandomList([])", [], __copied__([]))
