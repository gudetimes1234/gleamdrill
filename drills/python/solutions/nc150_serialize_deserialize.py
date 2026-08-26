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
    parts = []
    write(root, parts)
    return ",".join(parts)


def write(node, parts):
    if node is None:
        parts.append("#")
        return
    parts.append(str(node.val))
    write(node.left, parts)
    write(node.right, parts)


def deserialize(data):
    return read(data.split(","), [0])


def read(parts, at):
    token = parts[at[0]]
    at[0] += 1
    if token == "#":
        return None
    node = TreeNode(int(token))
    node.left = read(parts, at)
    node.right = read(parts, at)
    return node
