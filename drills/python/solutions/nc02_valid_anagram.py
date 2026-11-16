def isAnagram(s, t):
    if len(s) != len(t):  # @1
        return False  # @1

    count = {}  # @2
    for char in s:  # @3
        count[char] = count.get(char, 0) + 1  # @4

    for char in t:  # @5
        if char not in count:  # @6
            return False  # @6
        count[char] -= 1  # @7
        if count[char] < 0:  # @8
            return False  # @8

    return True  # @9
