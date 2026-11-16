class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def serialize(root):
    # Pre-order with a marker for every empty child. Recording the empties is
    # what makes the format unambiguous -- a pre-order list of values alone
    # matches many different trees -- and it is also what lets the reader work
    # without any length information: it stops as soon as it has consumed a
    # whole subtree.
    parts = []  # @1
    write(root, parts)  # @2
    return ",".join(parts)  # @3


def write(node, parts):
    if node is None:  # @4
        parts.append("#")  # @5
        return  # @5
    parts.append(str(node.val))  # @6
    write(node.left, parts)  # @7
    write(node.right, parts)  # @8


def deserialize(data):
    return read(data.split(","), [0])  # @9


def read(parts, at):
    token = parts[at[0]]  # @10
    at[0] += 1  # @11
    if token == "#":  # @12
        return None  # @12
    node = TreeNode(int(token))  # @13
    node.left = read(parts, at)  # @14
    node.right = read(parts, at)  # @15
    return node  # @16
