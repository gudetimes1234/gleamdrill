ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def characterReplacement(s, k):
    # One sweep per letter, asking a much simpler question each time: how long
    # a window can I hold if *this* is the letter I keep? No running frequency
    # map and no max-count bookkeeping — 26 easy passes instead of one subtle
    # one.
    longest = 0

    for target in ALPHABET:
        left = 0
        others = 0
        for right, char in enumerate(s):
            if char != target:
                others += 1
            while others > k:
                if s[left] != target:
                    others -= 1
                left += 1
            longest = max(longest, right - left + 1)

    return longest
