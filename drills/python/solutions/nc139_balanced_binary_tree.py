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
    return measure(root) >= 0


def measure(node):
    if node is None:
        return 0
    left, right = measure(node.left), measure(node.right)
    if left < 0 or right < 0 or abs(left - right) > 1:
        return -1
    return 1 + max(left, right)
