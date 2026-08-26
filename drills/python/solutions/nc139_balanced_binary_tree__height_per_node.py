class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isBalanced(root):
    # The definition read literally: every node's two sides differ by at most
    # one, and both sides are themselves balanced. It recomputes height at every
    # node, so the work is O(n^2) on a spindly tree -- the price of separating
    # the two questions the single-pass version answers together.
    if root is None:
        return True
    return (
        abs(height(root.left) - height(root.right)) <= 1
        and isBalanced(root.left)
        and isBalanced(root.right)
    )


def height(node):
    return 0 if node is None else 1 + max(height(node.left), height(node.right))
