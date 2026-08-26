class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isSubtree(root, subRoot):
    # Try to match at every node. The two questions are kept apart on purpose:
    # "are these two trees identical" is the whole of the work, and "is it a
    # subtree" is that question asked once per node. O(n*m) in the worst case,
    # and a partial match that fails deep is what makes it so.
    if subRoot is None:
        return True
    if root is None:
        return False
    return same(root, subRoot) or isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)


def same(a, b):
    if a is None and b is None:
        return True
    if a is None or b is None:
        return False
    return a.val == b.val and same(a.left, b.left) and same(a.right, b.right)
