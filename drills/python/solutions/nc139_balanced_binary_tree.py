class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isBalanced(root):
    # Height and balance in one walk. A subtree reports its height, or reports
    # that something below it is already unbalanced -- and once that happens
    # nothing above needs measuring at all. Using -1 as the "not balanced"
    # height is what lets a single return value carry both answers.
    return measure(root) >= 0  # @1


def measure(node):
    if node is None:  # @2
        return 0  # @2
    left, right = measure(node.left), measure(node.right)  # @3
    if left < 0 or right < 0 or abs(left - right) > 1:  # @4
        return -1  # @4
    return 1 + max(left, right)  # @5
