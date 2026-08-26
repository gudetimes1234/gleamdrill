ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

def characterReplacement(s, k):
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
