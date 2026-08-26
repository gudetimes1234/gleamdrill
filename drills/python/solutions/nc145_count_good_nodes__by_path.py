class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def goodNodes(root):
    # Carry the whole path instead of just its maximum, and take the maximum at
    # each node. The same answer for O(depth) memory per node rather than one
    # integer -- the version worth writing once, because it makes plain that the
    # running maximum is a fold of the path, not a separate idea.
    return count(root, [])


def count(node, above):
    if node is None:
        return 0
    here = 1 if all(other <= node.val for other in above) else 0
    below = above + [node.val]
    return here + count(node.left, below) + count(node.right, below)
