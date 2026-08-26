class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def maxPathSum(root):
    # Two different quantities, which is the whole trick. What a node *returns*
    # is the best path that can continue upwards -- so at most one of its
    # children. What it *records* is the best path through it, which may use
    # both. A negative branch is dropped rather than added, because a path is
    # allowed to stop.
    if root is None:
        return 0
    return walk(root)[1]


def walk(node):
    if node is None:
        return 0, -(10 ** 9)
    leftUp, leftBest = walk(node.left)
    rightUp, rightBest = walk(node.right)
    leftGain, rightGain = max(leftUp, 0), max(rightUp, 0)
    return (
        node.val + max(leftGain, rightGain),
        max(node.val + leftGain + rightGain, leftBest, rightBest),
    )
