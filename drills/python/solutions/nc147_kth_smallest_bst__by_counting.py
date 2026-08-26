class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def kthSmallest(root, k):
    # Count the left subtree and decide which way to go -- fewer than k on the
    # left means the answer is this node or to its right. It descends one path
    # instead of walking in order, and it is the version that adapts when the
    # tree stores its own subtree sizes, which turns the whole thing into
    # O(depth).
    node = root
    while node is not None:
        onTheLeft = size(node.left)
        if k <= onTheLeft:
            node = node.left
        elif k == onTheLeft + 1:
            return node.val
        else:
            k -= onTheLeft + 1
            node = node.right
    return -1


def size(node):
    return 0 if node is None else 1 + size(node.left) + size(node.right)
