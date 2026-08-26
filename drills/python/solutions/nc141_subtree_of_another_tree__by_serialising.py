class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def isSubtree(root, subRoot):
    # Serialise both trees and ask whether one string contains the other. That
    # turns an O(n*m) tree comparison into substring search, which is linear
    # with the right algorithm. It is only sound because the serialisation marks
    # the empty children: without them "2" inside "12" would match, and so would
    # a subtree that starts the same way but is missing a child.
    return serialise(subRoot) in serialise(root)


def serialise(node):
    if node is None:
        return "#"
    return "(" + str(node.val) + serialise(node.left) + serialise(node.right) + ")"
