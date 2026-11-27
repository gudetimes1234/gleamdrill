def minWindow(s, t):
    if not s or not t:  # @1
        return ""  # @1

    need = {}  # @2
    for c in t:  # @2
        need[c] = need.get(c, 0) + 1  # @2

    missing = len(t)  # @3
    left = 0  # @4
    best_start, best_length = 0, 0  # @4

    for right, c in enumerate(s):  # @5
        if need.get(c, 0) > 0:  # @6
            missing -= 1  # @6
        need[c] = need.get(c, 0) - 1  # @7

        while missing == 0:  # @8
            if best_length == 0 or right - left + 1 < best_length:  # @9
                best_start, best_length = left, right - left + 1  # @9
            need[s[left]] += 1  # @10
            if need[s[left]] > 0:  # @11
                missing += 1  # @11
            left += 1  # @12

    return s[best_start:best_start + best_length]  # @13
