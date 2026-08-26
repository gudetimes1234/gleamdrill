class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def maxPathSum(root):
    # Every path through every node, measured outright: for each node, take the
    # best downward run on each side and add them. It recomputes those runs from
    # scratch at every node, so it is O(n^2) on a spindly tree -- the cost of
    # asking the two questions separately instead of returning both from one
    # walk.
    found = candidates(root)
    return max(found) if found else 0


def candidates(node):
    if node is None:
        return []
    through = node.val + max(downwards(node.left), 0) + max(downwards(node.right), 0)
    return [through] + candidates(node.left) + candidates(node.right)


def downwards(node):
    if node is None:
        return 0
    return node.val + max(downwards(node.left), downwards(node.right), 0)
