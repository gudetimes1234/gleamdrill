try:
    (serialize, deserialize, TreeNode)
except NameError:
    raise Exception("__signature_mismatch__")

__results__ = []
def __case__(label, expected, actual):
    __results__.append([label, repr(expected), repr(actual)])

# LeetCode's level-order form: a list of values with None for a missing child,
# trailing Nones trimmed.
def __build__(values):
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue, head, i = [root], 0, 1
    while head < len(queue) and i < len(values):
        node = queue[head]
        head += 1
        if i < len(values):
            value = values[i]
            i += 1
            if value is not None:
                node.left = TreeNode(value)
                queue.append(node.left)
        if i < len(values):
            value = values[i]
            i += 1
            if value is not None:
                node.right = TreeNode(value)
                queue.append(node.right)
    return root


def __levels__(node):
    out, queue, head = [], [node], 0
    while head < len(queue) and len(out) < 500:
        current = queue[head]
        head += 1
        if current is None:
            out.append(None)
        else:
            out.append(current.val)
            queue.append(current.left)
            queue.append(current.right)
    while out and out[-1] is None:
        out.pop()
    return out

# The format is free, so what is checked is the round trip.
def __round_trip__(values):
    return __levels__(deserialize(serialize(__build__(values))))

__case__("deserialize(serialize([1,2,3,None,None,4,5]))", [1, 2, 3, None, None, 4, 5], __round_trip__([1, 2, 3, None, None, 4, 5]))
__case__("deserialize(serialize([]))", [], __round_trip__([]))
__case__("deserialize(serialize([0]))", [0], __round_trip__([0]))
__case__("deserialize(serialize(a lopsided tree))", [1, 2, None, 3, None, None, 4], __round_trip__([1, 2, None, 3, None, None, 4]))
__case__("deserialize(serialize([-1,-2,-3])) -- negatives survive", [-1, -2, -3], __round_trip__([-1, -2, -3]))
