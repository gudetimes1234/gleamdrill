from collections import Counter

def checkInclusion(s1, s2):
    if len(s1) > len(s2):  # @1
        return False  # @1

    need = Counter(s1)  # @2
    window = Counter(s2[:len(s1)])  # @3

    if window == need:  # @4
        return True  # @4

    for i in range(len(s1), len(s2)):  # @5
        window[s2[i]] += 1  # @6
        left_char = s2[i - len(s1)]  # @7
        window[left_char] -= 1  # @8
        if window[left_char] == 0:  # @9
            del window[left_char]  # @9
        if window == need:  # @10
            return True  # @10

    return False  # @11
