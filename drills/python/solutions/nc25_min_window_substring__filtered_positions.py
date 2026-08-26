def minWindow(s, t):
    if not s or not t:
        return ""

    need = {}
    for c in t:
        need[c] = need.get(c, 0) + 1

    # Only the positions that could possibly matter. For a long haystack and a
    # short needle this is a far shorter walk than the whole string.
    positions = [(i, c) for i, c in enumerate(s) if c in need]

    window = {}
    satisfied = 0
    left = 0
    best_start, best_length = 0, 0

    for right, (index, c) in enumerate(positions):
        window[c] = window.get(c, 0) + 1
        if window[c] == need[c]:
            satisfied += 1

        while satisfied == len(need):
            start = positions[left][0]
            length = index - start + 1
            if best_length == 0 or length < best_length:
                best_start, best_length = start, length
            leaving = positions[left][1]
            window[leaving] -= 1
            if window[leaving] < need[leaving]:
                satisfied -= 1
            left += 1

    return s[best_start:best_start + best_length]
