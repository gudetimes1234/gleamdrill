class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def buildTree(preorder, inorder):
    # The same construction without slicing anything: a map from value to its
    # in-order position, plus a low and a high bound saying which slice each
    # call owns. Building the map once turns the repeated search for the root --
    # the hidden O(n) inside the slicing version -- into a lookup.
    places = {value: i for i, value in enumerate(inorder)}  # @1
    return take(preorder, [0], places, 0, len(inorder) - 1)  # @2


def take(preorder, at, places, low, high):
    if low > high or at[0] >= len(preorder):  # @3
        return None  # @3
    root = preorder[at[0]]  # @4
    at[0] += 1  # @5
    split = places[root]  # @6
    return TreeNode(  # @7
        root,  # @7
        take(preorder, at, places, low, split - 1),  # @8
        take(preorder, at, places, split + 1, high),  # @9
    )
