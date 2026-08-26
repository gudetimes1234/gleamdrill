class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def maxDepth(root):
    # Count the levels instead of measuring the branches: take the whole
    # frontier, replace it with all its children, and add one. No recursion and
    # no stack -- which is what makes this the version that survives a tree deep
    # enough to overflow one.
    depth = 0
    frontier = [root] if root is not None else []
    while frontier:
        depth += 1
        frontier = [
            child
            for node in frontier
            for child in (node.left, node.right)
            if child is not None
        ]
    return depth
