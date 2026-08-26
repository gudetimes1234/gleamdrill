class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def kthSmallest(root, k):
    # An in-order walk of a search tree visits the values in order, so the
    # answer is the kth thing it reaches. Stopping there is the point: the tree
    # below the kth value is never touched, which is what separates this from
    # sorting everything. The explicit stack is what makes stopping possible --
    # a recursive walk would have to run to the end.
    stack, node = [], root
    while stack or node is not None:
        while node is not None:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right
    return -1
