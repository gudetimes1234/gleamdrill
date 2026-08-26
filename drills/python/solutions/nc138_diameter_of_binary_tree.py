class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def diameterOfBinaryTree(root):
    # One walk, doing two jobs: each call returns its own height, and on the way
    # past it records the path *through* that node -- left height plus right
    # height. The answer is the largest such path, so it is never returned, only
    # tracked. That split between what a call returns and what it records is the
    # pattern worth keeping.
    return measure(root)[1]


def measure(node):
    if node is None:
        return 0, 0
    leftHeight, leftWidest = measure(node.left)
    rightHeight, rightWidest = measure(node.right)
    return (
        1 + max(leftHeight, rightHeight),
        max(leftHeight + rightHeight, leftWidest, rightWidest),
    )
