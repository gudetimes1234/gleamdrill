def minWindow(s, t):
    if not s or not t:
        return ""

    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1

    missing = len(t)
    left = 0
    best_start, best_length = 0, 0

    for right, c in enumerate(s):
        if need.get(c, 0) > 0:
            missing -= 1
        need[c] = need.get(c, 0) - 1

        while missing == 0:
            if best_length == 0 or right - left + 1 < best_length:
                best_start, best_length = left, right - left + 1
            need[s[left]] += 1
            if need[s[left]] > 0:
                missing += 1
            left += 1

    return s[best_start:best_start + best_length]
