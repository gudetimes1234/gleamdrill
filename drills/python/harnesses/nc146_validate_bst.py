try:
    (isValidBST, TreeNode)
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

__case__("isValidBST([2,1,3])", True, isValidBST(__build__([2, 1, 3])))
__case__("isValidBST([])", True, isValidBST(__build__([])))
__case__("isValidBST([1])", True, isValidBST(__build__([1])))
__case__("isValidBST([5,1,4,None,None,3,6])", False, isValidBST(__build__([5, 1, 4, None, None, 3, 6])))
__case__("isValidBST(every node beats its parent, but 3 is on the wrong side)", False, isValidBST(__build__([5, 4, 6, None, None, 3, 7])))
__case__("isValidBST([2,2]) -- equal values are not allowed", False, isValidBST(__build__([2, 2])))
