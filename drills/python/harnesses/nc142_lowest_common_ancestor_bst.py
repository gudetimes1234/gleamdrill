try:
    (lowestCommonAncestor, TreeNode)
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

__bst__ = __build__([6, 2, 8, 0, 4, 7, 9, None, None, 3, 5])

__case__("lowestCommonAncestor(bst, 2, 8)", 6, lowestCommonAncestor(__bst__, 2, 8))
__case__("lowestCommonAncestor(bst, 2, 4) -- an ancestor counts", 2, lowestCommonAncestor(__bst__, 2, 4))
__case__("lowestCommonAncestor(bst, 3, 5)", 4, lowestCommonAncestor(__bst__, 3, 5))
__case__("lowestCommonAncestor(bst, 7, 9)", 8, lowestCommonAncestor(__bst__, 7, 9))
__case__("lowestCommonAncestor([1], 1, 1)", 1, lowestCommonAncestor(__build__([1]), 1, 1))
