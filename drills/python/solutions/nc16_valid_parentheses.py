def isValid(s):
    pairs = {')': '(', ']': '[', '}': '{'}  # @1
    stack = []  # @2

    for char in s:  # @3
        if char in pairs:  # @4
            if not stack or stack.pop() != pairs[char]:  # @5
                return False  # @5
        else:  # @6
            stack.append(char)  # @7

    return not stack  # @8
